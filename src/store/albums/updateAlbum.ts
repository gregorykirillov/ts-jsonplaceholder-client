import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { updateAlbumURL } from '../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { AlbumType } from '~/src/types';

export const updateAlbum = createAsyncThunk(
    'album/updateAlbum',
    async (data: AlbumType) => {
        const response = await axios.put(updateAlbumURL(data.id), {
            ...data,
        });
        return response.data;
    },
);

export const addCaseUpdateAlbum = (
    builder: BuilderType,
    albumEntityAdapter: EntityAdapter<AlbumType>,
): BuilderType => {
    return builder
        .addCase(updateAlbum.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(updateAlbum.fulfilled, (state, { payload }) => {
            albumEntityAdapter.setOne(state, payload);
            state.status = LoadingStatuses.success;
        })
        .addCase(updateAlbum.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
