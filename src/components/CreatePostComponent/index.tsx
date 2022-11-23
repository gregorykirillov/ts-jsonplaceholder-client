import React, { FormEvent, useState } from 'react';

import { Button, Input, TextArea } from '~/src/uikit';
import { createPost } from '~/src/store/posts';
import { useAppDispatch } from '~/src/store';

import styles from './styles.module.scss';

export type CreatePostData = {
    title: string;
    body: string;
};

const CreatePostComponent = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<CreatePostData>({
        title: '',
        body: '',
    });

    const handleChangeForm = (event: FormEvent) => {
        const input = event.target as HTMLInputElement;
        const inputValue = input.value;
        const inputName = input.name;

        setFormData({
            ...formData,
            [inputName]: inputValue,
        });
    };

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault();
        // eslint-disable-next-line no-console
        dispatch(createPost(formData))
            .then(() => {
                setFormData({
                    title: '',
                    body: '',
                });
                alert('Пост успешно добавлен!');
            })
            .catch((err) => console.log(err));
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
                <label htmlFor="body">Body</label>
                <TextArea
                    name="body"
                    id="body"
                    value={formData.body}
                    className={styles.textarea}
                    onChange={(event) => handleChangeForm(event)}
                />
            </div>
            <Button>Create Post</Button>
        </form>
    );
};

export default CreatePostComponent;
