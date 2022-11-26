import { AlbumType } from '~/src/types';
import { RootState } from '..';

export const selectAlbumModuleState = (state: RootState) => state.album;

export const selectAlbumIds = (state: RootState) =>
    selectAlbumModuleState(state).ids;

export const selectAlbums = (state: RootState) =>
    Object.values(selectAlbumModuleState(state).entities) as AlbumType[];

export const selectAlbumById = (state: RootState, albumId: number) =>
    Object.values(selectAlbumModuleState(state).entities).filter(
        (album) => (album as AlbumType).id === albumId,
    )[0] as AlbumType;
