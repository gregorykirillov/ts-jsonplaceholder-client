import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { selectComments } from './selectors';
import { getAllCommentsURL } from '~/src/routes';
import { RootState } from '..';
import { CommentType } from '~/src/types/CommentType';

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
const commentEntityAdapter = createEntityAdapter();

export const commentSlice = createSlice({
    name: 'comment',
    initialState: commentEntityAdapter.getInitialState({
        status: LoadingStatuses.idle,
    }),
    reducers: {},
    extraReducers: (builder) =>
        builder
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
            }),
});
