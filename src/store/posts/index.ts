import { EditPostData } from './../../components/CreateEditPostComponent/index';
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { selectPostIds } from './selectors';
import {
    deletePostURL,
    updatePostURL,
    getAllPostsURL,
    getPostURL,
    createPostURL,
} from '~/src/routes';
import { RootState } from '..';
import { CreatePostData } from '~/src/components/CreateEditPostComponent';

export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async (_, thunkAPI) => {
        if (selectPostIds(thunkAPI.getState() as RootState).length > 1) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        const response = await axios.get(getAllPostsURL);
        return response.data;
    },
);

export const fetchPost = createAsyncThunk(
    'post/fetchPost',
    async (postId: number, thunkAPI) => {
        if (
            selectPostIds(thunkAPI.getState() as RootState).includes(
                postId as number,
            )
        ) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        const response = await axios.get(getPostURL(postId));
        return response.data;
    },
);

export const createPost = createAsyncThunk(
    'post/createPost',
    async (data: CreatePostData) => {
        const response = await axios.post(createPostURL, {
            ...data,
        });
        return response.data;
    },
);

export const editPost = createAsyncThunk(
    'post/editPost',
    async (data: EditPostData) => {
        const response = await axios.put(updatePostURL(data.id), {
            ...data,
        });
        return response.data;
    },
);

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId: number) => {
        await axios.delete(deletePostURL(postId));
        return postId;
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

            .addCase(fetchPost.pending, (state) => {
                state.status = LoadingStatuses.inProgress;
            })
            .addCase(fetchPost.fulfilled, (state, { payload }) => {
                postEntityAdapter.addOne(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(fetchPost.rejected, (state, { payload }) => {
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
            })

            .addCase(editPost.pending, (state) => {
                state.status = LoadingStatuses.inProgress;
            })
            .addCase(editPost.fulfilled, (state, { payload }) => {
                postEntityAdapter.setOne(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(editPost.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            })

            .addCase(deletePost.pending, (state) => {
                state.status = LoadingStatuses.inProgress;
            })
            .addCase(deletePost.fulfilled, (state, id) => {
                postEntityAdapter.removeOne(state, id);
                state.status = LoadingStatuses.success;
            })
            .addCase(deletePost.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            }),
});
