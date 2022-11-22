import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { selectAlbumIds } from './selectors';
import { getAllAlbumsURL } from '~/src/routes';
import { RootState } from '..';

export const fetchAlbums = createAsyncThunk(
    'album/fetchAlbums',
    async (_, thunkAPI) => {
        if (selectAlbumIds(thunkAPI.getState() as RootState).length > 0) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        const response = await fetch(getAllAlbumsURL());
        return await response.json();
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
            }),
});
