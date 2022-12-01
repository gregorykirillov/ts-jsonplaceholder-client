import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { getAlbumsByPageURL } from '../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { AlbumType } from '~/src/types';

export const fetchAlbums = createAsyncThunk(
    'album/fetchAlbums',
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    async (page: number = 1) => {
        const response = await axios.get(getAlbumsByPageURL(page));
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
