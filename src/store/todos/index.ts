import {
    ActionReducerMapBuilder,
    createEntityAdapter,
    createSlice,
    EntityState,
} from '@reduxjs/toolkit';

import { LoadingStatuses } from '~/src/constants/loadingStatuses';
import { TodoType } from '~/src/types';
import { addCaseCreateTodo } from './createTodo';
import { addCaseFetchTodos } from './fetchTodos';
import { addCaseFetchTodo } from './fetchTodo';
import { addCaseUpdateTodo } from './updateTodo';
import { addCaseDeleteTodo } from './deleteTodo';

const todoEntityAdapter = createEntityAdapter<TodoType>();

export type BuilderType = ActionReducerMapBuilder<
    EntityState<TodoType> & { status: string }
>;

export const todoSlice = createSlice({
    name: 'todo',
    initialState: todoEntityAdapter.getInitialState({
        status: LoadingStatuses.idle,
    }),
    reducers: {},
    extraReducers: (builder) => {
        addCaseCreateTodo(builder, todoEntityAdapter);
        addCaseFetchTodos(builder, todoEntityAdapter);
        addCaseFetchTodo(builder, todoEntityAdapter);
        addCaseUpdateTodo(builder, todoEntityAdapter);
        addCaseDeleteTodo(builder, todoEntityAdapter);
    },
});

export { createTodo } from './createTodo';
export { fetchTodo } from './fetchTodo';
export { fetchTodos } from './fetchTodos';
export { updateTodo } from './updateTodo';
export { deleteTodo } from './deleteTodo';
