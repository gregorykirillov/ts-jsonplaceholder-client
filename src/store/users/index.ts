import {
    ActionReducerMapBuilder,
    createEntityAdapter,
    createSlice,
    EntityState,
} from '@reduxjs/toolkit';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { UserType } from './../../types/UserType';
import { AddCaseFetchUserById } from './fetchUserById';

const userEntityAdapter = createEntityAdapter<UserType>();

export type BuilderType = ActionReducerMapBuilder<
    EntityState<UserType> & { status: string }
>;

export const userSlice = createSlice({
    name: 'user',
    initialState: userEntityAdapter.getInitialState({
        status: LoadingStatuses.idle,
    }),
    reducers: {},
    extraReducers: (builder) => {
        AddCaseFetchUserById(builder, userEntityAdapter);
    },
});

export { fetchUserById } from './fetchUserById';
