import {
    ActionReducerMapBuilder,
    createEntityAdapter,
    createSlice,
    EntityState,
} from '@reduxjs/toolkit';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { PhotoType } from '~/src/types';
import { addCaseReadPhotos } from './fetchPhotos';

const photoEntityAdapter = createEntityAdapter<PhotoType>();

export type BuilderType = ActionReducerMapBuilder<
    EntityState<PhotoType> & { status: string }
>;

export const photoSlice = createSlice({
    name: 'photo',
    initialState: photoEntityAdapter.getInitialState({
        status: LoadingStatuses.idle,
    }),
    reducers: {},
    extraReducers: (builder) => addCaseReadPhotos(builder, photoEntityAdapter),
});

export { fetchPhotos } from './fetchPhotos';
