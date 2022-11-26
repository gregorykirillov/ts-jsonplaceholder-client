import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { getAllAlbumsURL } from '../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { AlbumType } from '~/src/types';
import { selectAlbumIds } from './selectors';
import { RootState } from '..';

export const fetchAlbums = createAsyncThunk(
    'album/fetchAlbums',
    async (_, thunkAPI) => {
        if (selectAlbumIds(thunkAPI.getState() as RootState).length > 1) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        const response = await axios.get(getAllAlbumsURL);
        return response.data;
    },
);

export const addCaseReadAlbums = (
    builder: BuilderType,
    albumEntityAdapter: EntityAdapter<AlbumType>,
): BuilderType => {
    return builder
        .addCase(fetchAlbums.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
            albumEntityAdapter.addMany(state, payload);
            state.status = LoadingStatuses.success;
        })
        .addCase(fetchAlbums.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
