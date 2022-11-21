import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { selectPostIds } from './selectors';
import { getAllPostsURL } from '~/src/routes';
import { RootState } from '..';

export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async (_, thunkAPI) => {
        if (selectPostIds(thunkAPI.getState() as RootState).length > 0) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        const response = await fetch(getAllPostsURL());
        return await response.json();
    },
);

const postEntityAdapter = createEntityAdapter();

export const postSlice = createSlice({
    name: 'post',
    initialState: postEntityAdapter.getInitialState({
        status: LoadingStatuses.idle,
    }),
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = LoadingStatuses.inProgress;
            })
            .addCase(fetchPosts.fulfilled, (state, { payload }) => {
                postEntityAdapter.addMany(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(fetchPosts.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            }),
});
