import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TodoElement from '../TodoElement';
import { selectTodos } from '~/src/store/todos/selectors';
import { fetchTodos } from '~/src/store/todos';
import { RootState, useAppDispatch } from '~/src/store';
import { Preloader } from '~/src/uikit';
import { TodoType } from '~/src/types/TodoType';

import styles from './styles.module.scss';

const TodoList = () => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodos()).finally(() => setLoading(false));
    }, []);

    const selectedTodos = useSelector((state: RootState) => selectTodos(state));
    const completedTodos: TodoType[] = [];

    const todos: TodoType[] = selectedTodos.reduce((acc, curr) => {
        if (curr.completed) completedTodos.push(curr);
        else {
            acc.push(curr);
        }
        return acc;
    }, [] as TodoType[]);

    if (isLoading) return <Preloader />;

    return (
        <div className={styles.generalList}>
            <div className={styles.todoList}>
                {todos.map((todo) => (
                    <TodoElement todo={todo} />
                ))}
            </div>
            <div className={styles.todoList}>
                {completedTodos.map((todo) => (
                    <TodoElement todo={todo} />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
