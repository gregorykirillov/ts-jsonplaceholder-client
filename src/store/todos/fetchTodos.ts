import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { getAllTodosURL } from './../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { TodoType } from '~/src/types/TodoType';
import { selectTodoIds } from './selectors';
import { RootState } from '..';

export const fetchTodos = createAsyncThunk(
    'todo/fetchTodos',
    async (_, thunkAPI) => {
        if (selectTodoIds(thunkAPI.getState() as RootState).length > 1) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        const response = await axios.get(getAllTodosURL);
        return response.data;
    },
);

export const addCaseFetchTodos = (
    builder: BuilderType,
    todoEntityAdapter: EntityAdapter<TodoType>,
): BuilderType => {
    return builder
        .addCase(fetchTodos.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(fetchTodos.fulfilled, (state, { payload }) => {
            todoEntityAdapter.addMany(state, payload);
            state.status = LoadingStatuses.success;
        })
        .addCase(fetchTodos.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
