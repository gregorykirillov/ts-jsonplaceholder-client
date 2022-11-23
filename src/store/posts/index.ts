import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { selectPostIds } from './selectors';
import { getAllPostsURL } from '~/src/routes';
import { RootState } from '..';
import { CreatePostData } from '~/src/components/CreatePostComponent';

export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async (_, thunkAPI) => {
        // Обработка случая, если пользователь зашёл на сайт по ссылке /posts/create
        // > 1 Костыль, но если брать настоящий API, он должен вернуть список постов
        // с уже добавленными текущими постами, в данном случае должен быть 0
        if (selectPostIds(thunkAPI.getState() as RootState).length > 1) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        const response = await axios(getAllPostsURL);
        return response.data;
    },
);

export const createPost = createAsyncThunk(
    'post/createPost',
    async (data: CreatePostData) => {
        const response = await axios.post(getAllPostsURL, {
            ...data,
        });
        return response.data;
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
            })

            .addCase(createPost.pending, (state) => {
                state.status = LoadingStatuses.inProgress;
            })
            .addCase(createPost.fulfilled, (state, { payload }) => {
                postEntityAdapter.addOne(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(createPost.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            }),
});
