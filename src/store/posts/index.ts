import {
    ActionReducerMapBuilder,
    createEntityAdapter,
    createSlice,
    EntityState,
} from '@reduxjs/toolkit';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { PostType } from '~/src/types/PostType';
import { addCaseCreatePost } from './createPost';
import { addCaseReadPosts } from './fetchPosts';
import { addCaseReadPost } from './fetchPost';
import { addCaseUpdatePost } from './updatePost';
import { addCaseDeletePost } from './deletePost';

const postEntityAdapter = createEntityAdapter<PostType>();

export type BuilderType = ActionReducerMapBuilder<
    EntityState<PostType> & { status: string }
>;

export const postSlice = createSlice({
    name: 'post',
    initialState: postEntityAdapter.getInitialState({
        status: LoadingStatuses.idle,
    }),
    reducers: {},
    extraReducers: (builder) => {
        addCaseCreatePost(builder, postEntityAdapter);
        addCaseReadPosts(builder, postEntityAdapter);
        addCaseReadPost(builder, postEntityAdapter);
        addCaseUpdatePost(builder, postEntityAdapter);
        addCaseDeletePost(builder, postEntityAdapter);
    },
});

export { createPost } from './createPost';
export { fetchPosts } from './fetchPosts';
export { fetchPost } from './fetchPost';
export { updatePost } from './updatePost';
export { deletePost } from './deletePost';
