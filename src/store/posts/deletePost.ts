import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { deletePostURL } from '../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { PostType } from '~/src/types';

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId: number) => {
        await axios.delete(deletePostURL(postId));
        return postId;
    },
);

export const addCaseDeletePost = (
    builder: BuilderType,
    postEntityAdapter: EntityAdapter<PostType>,
): BuilderType => {
    return builder
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
        });
};
