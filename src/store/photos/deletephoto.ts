import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { deletePhotoURL } from '../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { PhotoType } from '~/src/types';

export const deletePhoto = createAsyncThunk(
    'photo/deletePhoto',
    async (photoId: number) => {
        await axios.delete(deletePhotoURL(photoId));
        return photoId;
    },
);

export const addCaseDeletePhotos = (
    builder: BuilderType,
    photoEntityAdapter: EntityAdapter<PhotoType>,
): BuilderType => {
    return builder
        .addCase(deletePhoto.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(deletePhoto.fulfilled, (state, { payload }) => {
            photoEntityAdapter.removeOne(state, payload);
            state.status = LoadingStatuses.success;
        })
        .addCase(deletePhoto.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
