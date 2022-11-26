import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { createPostURL } from '../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { PostType } from '~/src/types';
import { CreatePostData } from '~/src/components/CreateEditPostComponent';

export const createPost = createAsyncThunk(
    'post/createPost',
    async (data: CreatePostData) => {
        const response = await axios.post(createPostURL, {
            ...data,
        });
        return response.data;
    },
);

export const addCaseCreatePost = (
    builder: BuilderType,
    postEntityAdapter: EntityAdapter<PostType>,
): BuilderType => {
    return builder
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
        });
};
