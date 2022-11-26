import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { selectAlbumIds } from './selectors';
import {
    createAlbumURL,
    deleteAlbumURL,
    getAlbumUrl,
    getAllAlbumsURL,
    updateAlbumURL,
} from '~/src/routes';
import { RootState } from '..';
import { CreateAlbumData } from '~/src/components/CreateAlbumComponent';
import { AlbumType } from '~/src/types/AlbumType';

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

        const response = await axios.get(getAlbumUrl(albumId));
        return response.data;
    },
);

export const createAlbum = createAsyncThunk(
    'album/createAlbum',
    async (data: CreateAlbumData) => {
        const response = await axios.post(createAlbumURL, {
            ...data,
        });
        return response.data;
    },
);

export const updateAlbum = createAsyncThunk(
    'album/updateAlbum',
    async (data: AlbumType) => {
        const response = await axios.put(updateAlbumURL(data.id), {
            ...data,
        });
        return response.data;
    },
);

export const deleteAlbum = createAsyncThunk(
    'post/deleteAlbum',
    async (albumId: number) => {
        await axios.delete(deleteAlbumURL(albumId));
        return albumId;
    },
);

const albumEntityAdapter = createEntityAdapter();

export const albumSlice = createSlice({
    name: 'album',
    initialState: albumEntityAdapter.getInitialState({
        status: LoadingStatuses.idle,
    }),
    reducers: {},
    extraReducers: (builder) =>
        builder
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
            })

            .addCase(createAlbum.pending, (state) => {
                state.status = LoadingStatuses.inProgress;
            })
            .addCase(createAlbum.fulfilled, (state, { payload }) => {
                albumEntityAdapter.addOne(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(createAlbum.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            })

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
            })

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
            }),
});
