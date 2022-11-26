import React, { FormEvent, useEffect, useState } from 'react';

import { Button, Input, Preloader } from '~/src/uikit';
import { fetchTodo, updateTodo } from '~/src/store/todos';
import { RootState, useAppDispatch } from '~/src/store';

import styles from './styles.module.scss';
import { TodoType } from '~/src/types/TodoType';
import { useSelector } from 'react-redux';
import { selectTodoById } from '~/src/store/todos/selectors';

type EditTodoComponentProps = {
    todoId: number;
};

const EditTodoComponent = ({ todoId }: EditTodoComponentProps) => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    const todo = useSelector((state: RootState) =>
        selectTodoById(state, todoId),
    );

    useEffect(() => {
        dispatch(fetchTodo(todoId)).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setFormData(todo);
    }, [todo]);

    const [formData, setFormData] = useState<TodoType>({
        id: todo?.id,
        userId: todo?.userId,
        title: todo?.title,
        completed: todo?.completed,
    });

    const handleChangeForm = (event: FormEvent) => {
        const input = event.target as HTMLInputElement;
        const inputName = input.name;
        const inputValue: string | boolean =
            input.type === 'checkbox' ? input.checked : input.value;

        setFormData({
            ...formData,
            [inputName]: inputValue,
        });
    };

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault();

        dispatch(updateTodo(formData))
            .then(() => {
                setFormData({
                    id: 0,
                    userId: 0,
                    title: '',
                    completed: false,
                });
                alert(`Задача успешно изменена!`);
            })
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err));
        return;
    };

    if (isLoading) return <Preloader />;

    return (
        <form
            className={styles.form}
            onSubmit={(event) => handleSubmitForm(event)}
        >
            <div>
                <label htmlFor="title">Title</label>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    className={styles.input}
                    onChange={(event) => handleChangeForm(event)}
                />
            </div>
            <div>
                <label htmlFor="body">Completed</label>
                <Input
                    type="checkbox"
                    name="completed"
                    id="completed"
                    checked={formData.completed}
                    className={styles.checkBox}
                    onChange={(event) => handleChangeForm(event)}
                />
            </div>
            <Button>Создать</Button>
        </form>
    );
};

export default EditTodoComponent;
