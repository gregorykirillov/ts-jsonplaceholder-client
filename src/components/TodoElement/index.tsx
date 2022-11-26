import { DragEvent, ReactNode } from 'react';
import cn from 'classnames';

import { StateType } from '../TodoList';

import styles from './styles.module.scss';

type TodoElementProps = {
    todoId: number;
    boardId: number;
    completed: boolean;
    setCurrentState: (s: StateType) => void;
    onHandleDrop: (boardId: number, todoId: number) => void;
    children: ReactNode;
};

const TodoElement = ({
    todoId,
    boardId,
    setCurrentState,
    onHandleDrop,
    completed,
    children,
}: TodoElementProps) => {
    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const dragStartHandler = () => {
        setCurrentState({
            todoId,
            boardId,
        });
    };

    const dropHandler = () => {
        onHandleDrop(boardId, todoId);
    };

    return (
        <div
            onDragOver={dragOverHandler}
            onDragStart={dragStartHandler}
            onDrop={dropHandler}
            draggable={true}
            className={cn(styles.todoELement, {
                [styles.completed]: completed,
            })}
        >
            {children}
        </div>
    );
};

export default TodoElement;
