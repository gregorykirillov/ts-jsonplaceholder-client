import React, { FormEvent } from 'react';

import { Button, Input } from '~/src/uikit';

import styles from './styles.module.scss';

type EditTodoComponentProps = {
    onSubmitForm: () => void;
    onChangeForm: (event: FormEvent) => void;
    title: string;
    completed: boolean;
};

const EditTodoComponent = ({
    title,
    completed,
    onChangeForm,
    onSubmitForm,
}: EditTodoComponentProps) => {
    const handleChangeForm = (event: FormEvent) => {
        onChangeForm(event);
    };

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault();

        onSubmitForm();
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
                    value={title}
                    className={styles.input}
                    onChange={(event) => handleChangeForm(event)}
                />
            </div>
            <div className={styles.checkBoxBlock}>
                <label htmlFor="completed">Completed</label>
                <Input
                    type="checkbox"
                    name="completed"
                    id="completed"
                    checked={completed}
                    className={styles.checkBox}
                    onChange={(event) => handleChangeForm(event)}
                />
            </div>
            <Button>Сохранить</Button>
        </form>
    );
};

export default EditTodoComponent;
