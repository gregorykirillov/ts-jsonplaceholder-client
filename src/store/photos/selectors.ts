import { RootState } from '..';

export const selectPhotoModuleState = (state: RootState) => state.photo;

export const selectPhotoIds = (state: RootState) =>
    selectPhotoModuleState(state).ids;

export const selectPhotos = (state: RootState) =>
    selectPhotoModuleState(state).entities;
