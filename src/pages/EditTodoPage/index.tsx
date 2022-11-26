import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { EditTodoComponent } from '~/src/components';
import { RootState, useAppDispatch } from '~/src/store';
import { fetchTodo, updateTodo } from '~/src/store/todos';
import { selectTodoById } from '~/src/store/todos/selectors';
import { TodoType } from '~/src/types';
import { Preloader } from '~/src/uikit';
import { TODOS_PATH } from '~/src/routes';

const EditTodoPage = () => {
    const todoId = Number(useParams().id);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const todo = useSelector((state: RootState) =>
        selectTodoById(state, todoId),
    );

    const [formData, setFormData] = useState<TodoType>({
        id: todo?.id,
        userId: todo?.userId,
        title: todo?.title,
        completed: todo?.completed,
    });

    useEffect(() => {
        dispatch(fetchTodo(todoId)).finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        setFormData(todo);
    }, [todo]);

    const onChangeForm = (event: FormEvent) => {
        const input = event.target as HTMLInputElement;
        const inputName = input.name;
        const inputValue: string | boolean =
            input.type === 'checkbox' ? input.checked : input.value;

        setFormData({
            ...formData,
            [inputName]: inputValue,
        });
    };

    const onSubmitForm = () => {
        dispatch(updateTodo(formData))
            .then(() => {
                setFormData({
                    id: 0,
                    userId: 0,
                    title: '',
                    completed: false,
                });
                alert(`Задача успешно изменена!`);
                navigate(TODOS_PATH);
            })
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err));
    };

    if (isLoading) return <Preloader />;

    return (
        <>
            <h2>Изменение задачи</h2>

            <EditTodoComponent
                title={formData.title}
                completed={formData.completed}
                onSubmitForm={onSubmitForm}
                onChangeForm={onChangeForm}
            />
        </>
    );
};

export default EditTodoPage;
