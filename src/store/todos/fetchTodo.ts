import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { getTodoURL } from './../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { TodoType } from '~/src/types';
import { selectTodoIds } from './selectors';
import { RootState } from '..';

export const fetchTodo = createAsyncThunk(
    'todo/fetchTodo',
    async (todoId: number, thunkAPI) => {
        if (
            selectTodoIds(thunkAPI.getState() as RootState).includes(
                todoId as number,
            )
        ) {
            return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
        }

        const response = await axios.get(getTodoURL(todoId));
        return response.data;
    },
);

export const addCaseFetchTodo = (
    builder: BuilderType,
    todoEntityAdapter: EntityAdapter<TodoType>,
): BuilderType => {
    return builder
        .addCase(fetchTodo.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(fetchTodo.fulfilled, (state, { payload }) => {
            todoEntityAdapter.addOne(state, payload);
            state.status = LoadingStatuses.success;
        })
        .addCase(fetchTodo.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
