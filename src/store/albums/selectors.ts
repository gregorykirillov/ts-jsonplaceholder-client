import { RootState } from '..';

export const selectAlbumModuleState = (state: RootState) => state.album;

export const selectAlbumIds = (state: RootState) =>
    selectAlbumModuleState(state).ids;

export const selectAlbums = (state: RootState) =>
    selectAlbumModuleState(state).entities;
