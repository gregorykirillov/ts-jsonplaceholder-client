import { PostType } from '~/src/types/PostType';
import { RootState } from '..';

export const selectPostModuleState = (state: RootState) => state.post;

export const selectPostIds = (state: RootState) =>
    selectPostModuleState(state).ids;

export const selectPosts = (state: RootState) =>
    Object.values(selectPostModuleState(state).entities) as PostType[];
