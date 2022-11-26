import axios from 'axios';
import { createAsyncThunk, EntityAdapter } from '@reduxjs/toolkit';

import { createTodoURL } from './../../routes/index';
import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { BuilderType } from '.';
import { TodoType } from '~/src/types';
import { CreateTodoData } from '~/src/components/CreateTodoComponent';

export const createTodo = createAsyncThunk(
    'post/createPost',
    async (data: CreateTodoData) => {
        const response = await axios.post(createTodoURL, {
            ...data,
        });
        return response.data;
    },
);

export const addCaseCreateTodo = (
    builder: BuilderType,
    todoEntityAdapter: EntityAdapter<TodoType>,
): BuilderType => {
    return builder

        .addCase(createTodo.pending, (state) => {
            state.status = LoadingStatuses.inProgress;
        })
        .addCase(createTodo.fulfilled, (state, { payload }) => {
            todoEntityAdapter.addOne(state, payload);
            state.status = LoadingStatuses.success;
        })
        .addCase(createTodo.rejected, (state, { payload }) => {
            state.status =
                payload === LoadingStatuses.earlyAdded
                    ? LoadingStatuses.success
                    : LoadingStatuses.failed;
        });
};
