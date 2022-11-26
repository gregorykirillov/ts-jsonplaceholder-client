import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { getAllCommentsURL } from '../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { CommentType } from '~/src/types/CommentType';
import { selectComments } from './selectors';
import { RootState } from '..';

export const fetchComments = createAsyncThunk(
    'comment/fetchComments',
    async (postId: number, thunkAPI) => {
        const comments = selectComments(thunkAPI.getState() as RootState);

        if (
            Object.values(comments).filter(
                (comment) => (comment as CommentType).postId === postId,
            ).length
        ) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        const response = await axios.get(getAllCommentsURL(postId));
        return response.data;
    },
);

export const addCaseReadComments = (
    builder: BuilderType,
    commentEntityAdapter: EntityAdapter<CommentType>,
): BuilderType => {
    return builder
        .addCase(fetchComments.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(
            fetchComments.fulfilled,
            (state, { payload }: { payload: CommentType[] }) => {
                /* --- Fake case for nested comments */
                payload.map((comment, index) => {
                    if (!comment['kids']) comment['kids'] = [];

                    const newKid = structuredClone(payload[index]);
                    comment['kids'].push(newKid);

                    return comment;
                });
                /* --- Fake case for nested comments */
                commentEntityAdapter.addMany(state, payload);
                state.status = LoadingStatuses.success;
            },
        )
        .addCase(fetchComments.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
