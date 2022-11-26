import { PhotoType } from '~/src/types';
import { RootState } from '..';

export const selectPhotoModuleState = (state: RootState) => state.photo;

export const selectPhotoIds = (state: RootState) =>
    selectPhotoModuleState(state).ids;

export const selectPhotos = (state: RootState, albumId: number) =>
    Object.values(selectPhotoModuleState(state).entities).filter(
        (photo) => (photo as PhotoType).albumId === albumId,
    ) as PhotoType[];
