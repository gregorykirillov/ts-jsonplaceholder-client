import { TodoType } from '~/src/types/TodoType';
import { RootState } from '..';

export const selectTodoModuleState = (state: RootState) => state.todo;

export const selectTodoIds = (state: RootState) =>
    selectTodoModuleState(state).ids;

export const selectTodos = (state: RootState) =>
    Object.values(selectTodoModuleState(state).entities) as TodoType[];
