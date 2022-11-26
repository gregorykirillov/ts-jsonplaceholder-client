import { TodoType } from '~/src/types/TodoType';
import { RootState } from '..';

export const selectTodoModuleState = (state: RootState) => state.todo;

export const selectTodoIds = (state: RootState) =>
    selectTodoModuleState(state).ids;

export const selectTodos = (state: RootState) =>
    Object.values(selectTodoModuleState(state).entities) as TodoType[];

export const selectTodoById = (state: RootState, todoId: number) =>
    Object.values(selectTodoModuleState(state).entities).filter(
        (todo) => (todo as TodoType).id === todoId,
    )[0] as TodoType;
