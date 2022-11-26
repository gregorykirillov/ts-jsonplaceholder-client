import {
    ActionReducerMapBuilder,
    createEntityAdapter,
    createSlice,
    EntityState,
} from '@reduxjs/toolkit';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { AlbumType } from '~/src/types';
import { addCaseUpdateAlbum } from './updateAlbum';
import { addCaseCreateAlbum } from './createAlbum';
import { addCaseReadAlbums } from './fetchAlbums';
import { addCaseDeleteAlbum } from './deleteAlbum';
import { addCaseReadAlbum } from './fetchAlbum';

const albumEntityAdapter = createEntityAdapter<AlbumType>();

export type BuilderType = ActionReducerMapBuilder<
    EntityState<AlbumType> & { status: string }
>;

export const albumSlice = createSlice({
    name: 'album',
    initialState: albumEntityAdapter.getInitialState({
        status: LoadingStatuses.idle,
    }),
    reducers: {},
    extraReducers: (builder) => {
        addCaseCreateAlbum(builder, albumEntityAdapter);
        addCaseReadAlbums(builder, albumEntityAdapter);
        addCaseReadAlbum(builder, albumEntityAdapter);
        addCaseUpdateAlbum(builder, albumEntityAdapter);
        addCaseDeleteAlbum(builder, albumEntityAdapter);
    },
});

export { createAlbum } from './createAlbum';
export { fetchAlbums } from './fetchAlbums';
export { fetchAlbum } from './fetchAlbum';
export { updateAlbum } from './updateAlbum';
export { deleteAlbum } from './deleteAlbum';
