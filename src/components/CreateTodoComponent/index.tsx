import React, { FormEvent, useState } from 'react';

import { Button, Input } from '~/src/uikit';
import { createTodo } from '~/src/store/todos';
import { useAppDispatch } from '~/src/store';

import styles from './styles.module.scss';

export type CreateTodoData = {
    title: string;
    completed: boolean;
};

const CreateTodoComponent = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<CreateTodoData>({
        title: '',
        completed: false,
    });

    const handleChangeForm = (event: FormEvent) => {
        const input = event.target as HTMLInputElement;
        let inputValue: string | boolean = input.value;
        const inputName = input.name;

        if (!inputValue) inputValue = input.checked;

        setFormData({
            ...formData,
            [inputName]: inputValue,
        });
    };

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault();

        dispatch(createTodo(formData))
            .then(() => {
                setFormData({
                    title: '',
                    completed: false,
                });
                alert(`Задача успешно создана!`);
            })
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err));
        return;
    };

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
                <label htmlFor="completed">Completed</label>
                <Input
                    type="checkbox"
                    name="completed"
                    id="completed"
                    checked={formData.completed}
                    onChange={(event) => handleChangeForm(event)}
                />
            </div>
            <Button>Создать</Button>
        </form>
    );
};

export default CreateTodoComponent;
