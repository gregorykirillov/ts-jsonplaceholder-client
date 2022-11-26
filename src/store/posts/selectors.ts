import { PostType } from '~/src/types';
import { RootState } from '..';

export const selectPostModuleState = (state: RootState) => state.post;

export const selectPostIds = (state: RootState): number[] =>
    selectPostModuleState(state).ids as number[];

export const selectPosts = (state: RootState) =>
    Object.values(selectPostModuleState(state).entities) as PostType[];

export const selectPostById = (state: RootState, postId: number) =>
    Object.values(selectPostModuleState(state).entities).filter(
        (post) => (post as PostType).id === postId,
    )[0] as PostType;
