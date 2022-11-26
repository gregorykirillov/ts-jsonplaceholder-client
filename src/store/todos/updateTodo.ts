import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { updateTodoURL } from './../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { TodoType } from '~/src/types';

export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async (data: TodoType) => {
        const response = await axios.put(updateTodoURL(data.id), {
            ...data,
        });
        return response.data;
    },
);

export const addCaseUpdateTodo = (
    builder: BuilderType,
    todoEntityAdapter: EntityAdapter<TodoType>,
): BuilderType => {
    return builder

        .addCase(updateTodo.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(updateTodo.fulfilled, (state, { payload }) => {
            todoEntityAdapter.setOne(state, payload);
            state.status = LoadingStatuses.success;
        })
        .addCase(updateTodo.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
