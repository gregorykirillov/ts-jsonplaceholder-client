import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { updatePostURL } from '../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { PostType } from '~/src/types/PostType';
import { EditPostData } from '~/src/components/CreateEditPostComponent';

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async (data: EditPostData) => {
        const response = await axios.put(updatePostURL(data.id), {
            ...data,
        });
        return response.data;
    },
);

export const addCaseUpdatePost = (
    builder: BuilderType,
    postEntityAdapter: EntityAdapter<PostType>,
): BuilderType => {
    return builder
        .addCase(updatePost.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(updatePost.fulfilled, (state, { payload }) => {
            postEntityAdapter.setOne(state, payload);
            state.status = LoadingStatuses.success;
        })
        .addCase(updatePost.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
