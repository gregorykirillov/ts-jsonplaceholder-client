import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { getAlbumPhotosURL } from '../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { PhotoType } from '~/src/types/PhotoType';
import { selectPhotos } from './selectors';
import { RootState } from '..';

export const fetchPhotos = createAsyncThunk(
    'photo/fetchPhotos',
    async (albumId: number, thunkAPI) => {
        const photos = selectPhotos(thunkAPI.getState() as RootState, albumId);

        if (
            Object.values(photos).filter(
                (photo) => (photo as PhotoType).albumId === albumId,
            ).length
        ) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        const response = await axios.get(getAlbumPhotosURL(albumId));
        return response.data;
    },
);

export const addCaseReadPhotos = (
    builder: BuilderType,
    photoEntityAdapter: EntityAdapter<PhotoType>,
): BuilderType => {
    return builder
        .addCase(fetchPhotos.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
            photoEntityAdapter.addMany(state, payload);
            state.status = LoadingStatuses.success;
        })
        .addCase(fetchPhotos.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
