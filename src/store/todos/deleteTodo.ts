import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { deleteTodoURL } from './../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { TodoType } from '~/src/types';

export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (todoId: number) => {
        await axios.delete(deleteTodoURL(todoId));
        return todoId;
    },
);

export const addCaseDeleteTodo = (
    builder: BuilderType,
    todoEntityAdapter: EntityAdapter<TodoType>,
): BuilderType => {
    return builder
        .addCase(deleteTodo.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(deleteTodo.fulfilled, (state, id) => {
            todoEntityAdapter.removeOne(state, id);
            state.status = LoadingStatuses.success;
        })
        .addCase(deleteTodo.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
