import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { selectUserIds } from './selectors';
import { getUserByIdURL } from '~/src/routes';
import { RootState } from '..';

const fetchingItems: number[] = [];

export const fetchUserById = createAsyncThunk(
    'user/fetchUsers',
    async (userId: number, thunkAPI) => {
        if (
            selectUserIds(thunkAPI.getState() as RootState).length > 0 ||
            fetchingItems.includes(userId)
        ) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        if (!userId && userId !== 0) {
            return thunkAPI.rejectWithValue(LoadingStatuses.failed);
        }

        fetchingItems.push(userId);
        const response = await axios.get(getUserByIdURL(userId));
        return response.data;
    },
);

const userEntityAdapter = createEntityAdapter();

export const userSlice = createSlice({
    name: 'user',
    initialState: userEntityAdapter.getInitialState({
        status: LoadingStatuses.idle,
    }),
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.status = LoadingStatuses.inProgress;
            })
            .addCase(fetchUserById.fulfilled, (state, { payload }) => {
                userEntityAdapter.addOne(state, payload);
                fetchingItems.filter((uId) => uId !== payload.id);
                state.status = LoadingStatuses.success;
            })
            .addCase(fetchUserById.rejected, (state, { payload }) => {
                state.status =
                    payload === LoadingStatuses.earlyAdded
                        ? LoadingStatuses.success
                        : LoadingStatuses.failed;
            }),
});
