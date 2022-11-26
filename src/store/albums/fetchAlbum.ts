import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { getAlbumURL } from '../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { AlbumType } from '~/src/types';
import { selectAlbumIds } from './selectors';
import { RootState } from '..';

export const fetchAlbum = createAsyncThunk(
    'album/fetchAlbum',
    async (albumId: number, thunkAPI) => {
        if (
            selectAlbumIds(thunkAPI.getState() as RootState).includes(
                albumId as number,
            )
        ) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        const response = await axios.get(getAlbumURL(albumId));
        return response.data;
    },
);

export const addCaseReadAlbum = (
    builder: BuilderType,
    albumEntityAdapter: EntityAdapter<AlbumType>,
): BuilderType => {
    return builder
        .addCase(fetchAlbum.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(fetchAlbum.fulfilled, (state, { payload }) => {
            albumEntityAdapter.addOne(state, payload);
            state.status = LoadingStatuses.success;
        })
        .addCase(fetchAlbum.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
