import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { getPostURL } from './../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { PostType } from '~/src/types/PostType';
import { selectPostIds } from './selectors';
import { RootState } from '..';

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

export const addCaseReadPost = (
    builder: BuilderType,
    postEntityAdapter: EntityAdapter<PostType>,
): BuilderType => {
    return builder
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
        });
};
