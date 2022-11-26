import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { selectTodoIds } from './selectors';
import {
    createTodoURL,
    deleteTodoURL,
    getAllTodosURL,
    getTodoURL,
    updateTodoURL,
} from '~/src/routes';
import { RootState } from '..';
import { TodoType } from '~/src/types/TodoType';
import { CreateTodoData } from '~/src/components/CreateTodoComponent';

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

export const fetchTodo = createAsyncThunk(
    'post/fetchTodo',
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

export const createTodo = createAsyncThunk(
    'post/createPost',
    async (data: CreateTodoData) => {
        const response = await axios.post(createTodoURL, {
            ...data,
        });
        return response.data;
    },
);

export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async (data: TodoType) => {
        const response = await axios.put(updateTodoURL(data.id), {
            ...data,
        });
        return response.data;
    },
);

export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (todoId: number) => {
        await axios.delete(deleteTodoURL(todoId));
        return todoId;
    },
);

const todoEntityAdapter = createEntityAdapter();

export const todoSlice = createSlice({
    name: 'todo',
    initialState: todoEntityAdapter.getInitialState({
        status: LoadingStatuses.idle,
    }),
    reducers: {},
    extraReducers: (builder) =>
        builder
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
            })

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
            })

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
            })

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
            })

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
            }),
});
