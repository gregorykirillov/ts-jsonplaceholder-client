import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

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

        const response = await fetch(getAllCommentsURL(postId));
        return await response.json();
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
            .addCase(fetchComments.fulfilled, (state, { payload }) => {
                commentEntityAdapter.addMany(state, payload);
                state.status = LoadingStatuses.success;
            })
            .addCase(fetchComments.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            }),
});
