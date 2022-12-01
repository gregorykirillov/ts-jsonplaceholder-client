import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { getPostsURLByPage } from './../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { PostType } from '~/src/types';

export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    async (page: number = 1) => {
        const response = await axios.get(getPostsURLByPage(page));
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
