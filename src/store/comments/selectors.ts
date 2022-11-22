import { CommentType } from '~/src/types/CommentType';
import { RootState } from '..';

export const selectPostModuleState = (state: RootState) => state.comment;

export const selectCommentIds = (state: RootState) =>
    selectPostModuleState(state).ids;

export const selectComments = (state: RootState) =>
    selectPostModuleState(state).entities;

export const selectPostComments = (state: RootState, postId: number) =>
    Object.values(selectPostModuleState(state).entities).filter(
        (comment) => (comment as CommentType).postId === postId,
    ) as CommentType[];
