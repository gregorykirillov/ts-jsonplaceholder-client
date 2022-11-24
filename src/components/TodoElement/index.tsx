import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { RootState, useAppDispatch } from '~/src/store';
import { TodoType } from '~/src/types/TodoType';
import { fetchUserById } from '~/src/store/users';
import { selectUserById } from '~/src/store/users/selectors';

import styles from './styles.module.scss';

const TodoElement = ({ todo }: { todo: TodoType }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserById(todo.userId));
    }, []);

    const user = useSelector((state: RootState) =>
        selectUserById(state, todo.userId),
    );

    return (
        <div
            className={cn(styles.todoELement, {
                [styles.completed]: todo.completed,
            })}
        >
            <div className={styles.infoBlock}>
                <span className={styles.username}>
                    {user?.username || 'Anonym'}
                </span>
            </div>
            <div className={styles.todoTitle}>{todo.title}</div>
        </div>
    );
};

export default TodoElement;
