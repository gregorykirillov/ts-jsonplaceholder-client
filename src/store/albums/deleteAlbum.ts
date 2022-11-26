import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { deleteAlbumURL } from '../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { AlbumType } from '~/src/types';

export const deleteAlbum = createAsyncThunk(
    'post/deleteAlbum',
    async (albumId: number) => {
        await axios.delete(deleteAlbumURL(albumId));
        return albumId;
    },
);

export const addCaseDeleteAlbum = (
    builder: BuilderType,
    albumEntityAdapter: EntityAdapter<AlbumType>,
): BuilderType => {
    return builder
        .addCase(deleteAlbum.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(deleteAlbum.fulfilled, (state, { payload }) => {
            albumEntityAdapter.removeOne(state, payload);
            state.status = LoadingStatuses.success;
        })
        .addCase(deleteAlbum.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
