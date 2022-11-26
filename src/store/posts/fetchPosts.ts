import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { getAllPostsURL } from './../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { PostType } from '~/src/types/PostType';
import { selectPostIds } from './selectors';
import { RootState } from '..';

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

export const addCaseReadPosts = (
    builder: BuilderType,
    postEntityAdapter: EntityAdapter<PostType>,
): BuilderType => {
    return builder
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
        });
};
