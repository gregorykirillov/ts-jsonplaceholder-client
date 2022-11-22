import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { selectPhotos } from './selectors';
import { getAlbumPhotosURL } from '~/src/routes';
import { RootState } from '..';
import { PhotoType } from '~/src/types/PhotoType';

export const fetchPhotos = createAsyncThunk(
    'photo/fetchPhotos',
    async (albumId: number, thunkAPI) => {
        const photos = selectPhotos(thunkAPI.getState() as RootState);

        if (
            Object.values(photos).filter(
                (photo) => (photo as PhotoType).albumId === albumId,
            ).length
        ) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        const response = await fetch(getAlbumPhotosURL(albumId));
        return await response.json();
    },
);
const photoEntityAdapter = createEntityAdapter();

export const photoSlice = createSlice({
    name: 'photo',
    initialState: photoEntityAdapter.getInitialState({
        status: LoadingStatuses.idle,
    }),
    reducers: {},
    extraReducers: (builder) =>
        builder
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
            }),
});
