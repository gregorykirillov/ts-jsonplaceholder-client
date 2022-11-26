import {
    ActionReducerMapBuilder,
    createEntityAdapter,
    createSlice,
    EntityState,
} from '@reduxjs/toolkit';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { CommentType } from '~/src/types/CommentType';
import { addCaseReadComments } from './fetchComments';

const commentEntityAdapter = createEntityAdapter<CommentType>();

export type BuilderType = ActionReducerMapBuilder<
    EntityState<CommentType> & { status: string }
>;

export const commentSlice = createSlice({
    name: 'comment',
    initialState: commentEntityAdapter.getInitialState({
        status: LoadingStatuses.idle,
    }),
    reducers: {},
    extraReducers: (builder) => {
        addCaseReadComments(builder, commentEntityAdapter);
    },
});

export { fetchComments } from './fetchComments';
