import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import TodoElement from '../TodoElement';
import { selectTodos } from '~/src/store/todos/selectors';
import { deleteTodo, fetchTodos, updateTodo } from '~/src/store/todos';
import { RootState, useAppDispatch } from '~/src/store';
import { Button, Preloader } from '~/src/uikit';
import { TodoType } from '~/src/types';

import deleteSvg from '~/public/icons/delete.svg';
import editSvg from '~/public/icons/edit.svg';

import styles from './styles.module.scss';

type BoardIdType = number;
type TodoIdType = number;

export type StateType = {
    todoId: TodoIdType;
    boardId: BoardIdType;
};

export type BoardType = {
    id: number;
    title: string;
    items: TodoType[];
};

const TodoList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currPath = useLocation().pathname;

    const [isLoading, setLoading] = useState(true);
    const stateRef = useRef({} as StateType);

    const setCurrentState = (state: StateType) => {
        stateRef.current = state;
    };

    const [boards, setBoards] = useState<BoardType[]>([]);

    const handleEditTodo = (todoId: number) => {
        navigate(`${currPath}/edit/${todoId}`);
    };

    const handleDeleteTodo = (todoId: number, boardId: number) => {
        dispatch(deleteTodo(todoId)).finally(() => {
            const updatedBoards = boards.map((board) => {
                if (board.id === boardId) {
                    return {
                        ...board,
                        items: board.items.filter((todo) => todo.id !== todoId),
                    };
                }
                return board;
            });

            setBoards(updatedBoards);
        });
    };

    const handleDrop = (boardId: BoardIdType, targetTodoId: TodoIdType) => {
        const { boardId: sourceBoardId, todoId: sourceTodoId } =
            stateRef.current;

        const sourceBoard = boards.find(
            (board) => board.id === sourceBoardId,
        ) as BoardType;
        const targetBoard = boards.find(
            (board) => board.id === boardId,
        ) as BoardType;

        if (!sourceBoard || !targetBoard) return;

        const sourceTodo = sourceBoard.items.find(
            (todo: TodoType) => todo.id === sourceTodoId,
        );

        if (!sourceTodo) return;

        let updatedBoards;

        if (sourceBoard !== targetBoard) {
            const reversedCompletedTodo = {
                ...sourceTodo,
                ...{ completed: !sourceTodo.completed },
            } as TodoType;

            dispatch(updateTodo(reversedCompletedTodo));

            updatedBoards = boards.map((board) => {
                if (board === sourceBoard) {
                    return {
                        ...board,
                        items: board.items.filter(
                            (todo) => todo.id !== sourceTodoId,
                        ),
                    };
                }

                if (board === targetBoard) {
                    const targetTodoInd = targetBoard.items.findIndex(
                        (todo: TodoType) => todo.id === targetTodoId,
                    );

                    const newItems = [...board.items];
                    newItems.splice(targetTodoInd, 0, reversedCompletedTodo);

                    return {
                        ...board,
                        items: newItems,
                    };
                }

                return board;
            });
        } else {
            dispatch(updateTodo(sourceTodo));

            updatedBoards = boards.map((board) => {
                if (board === sourceBoard) {
                    const targetTodoInd = board.items.findIndex(
                        (todo) => todo.id === targetTodoId,
                    );

                    let newItems = [...board.items];
                    newItems = newItems.filter(
                        (item) => item.id !== sourceTodoId,
                    );
                    newItems.splice(targetTodoInd, 0, sourceTodo);

                    return {
                        ...board,
                        items: newItems,
                    };
                }

                return board;
            });
        }

        setBoards(updatedBoards);
    };

    useEffect(() => {
        dispatch(fetchTodos()).finally(() => setLoading(false));
    }, []);

    const selectedTodos = useSelector((state: RootState) => selectTodos(state));

    const completedTodos = [] as TodoType[];
    const uncompletedTodos: TodoType[] = selectedTodos.reduce((acc, curr) => {
        if (curr.completed) completedTodos.push(curr);
        else acc.push(curr);
        return acc;
    }, [] as TodoType[]);

    useEffect(() => {
        if (!isLoading) {
            setBoards([
                {
                    id: 1,
                    title: 'Сделать',
                    items: uncompletedTodos,
                },
                {
                    id: 2,
                    title: 'Сделано',
                    items: completedTodos,
                },
            ]);
        }
    }, [isLoading]);

    if (isLoading) return <Preloader />;

    return (
        <div className={styles.generalList}>
            {boards.map((board) => (
                <div key={board.id} className={styles.board}>
                    <span>{board.title}</span>
                    {board?.items?.map((todo) => {
                        return (
                            <TodoElement
                                key={todo.id}
                                todoId={todo.id}
                                boardId={board.id}
                                completed={todo.completed}
                                onHandleDrop={handleDrop}
                                setCurrentState={setCurrentState}
                            >
                                <span className={styles.title}>
                                    {todo.title}
                                </span>

                                <div className={styles.actionBlock}>
                                    <Button
                                        inline={true}
                                        onClick={() => handleEditTodo(todo.id)}
                                    >
                                        <img
                                            className={styles.editSvg}
                                            src={editSvg}
                                        />
                                    </Button>
                                    <Button
                                        inline={true}
                                        onClick={() =>
                                            handleDeleteTodo(todo.id, board.id)
                                        }
                                    >
                                        <img
                                            className={styles.deleteSvg}
                                            src={deleteSvg}
                                        />
                                    </Button>
                                </div>
                            </TodoElement>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default TodoList;
