import React, { FormEvent, useState } from 'react';

import { Button, Input, TextArea } from '~/src/uikit';
import { createPost, editPost } from '~/src/store/posts';
import { useAppDispatch } from '~/src/store';
import { PostType } from '~/src/types/PostType';

import styles from './styles.module.scss';

export interface CreatePostData {
    title: string;
    body: string;
}

export interface EditPostData extends CreatePostData {
    id: number;
    userId: number;
}

type PostData = CreatePostData | EditPostData;

type PropsType = {
    mode: 'create' | 'edit';
    post?: PostType;
};

const CreateEditPostComponent = ({ mode, post }: PropsType) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<CreatePostData>({
        title: post?.title || '',
        body: post?.body || '',
    });
    const buttonName = mode[0].toUpperCase() + mode.slice(1);

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
        let dispatchEvent;
        let dispatchData: PostData = {} as PostData;

        if (mode === 'create') {
            dispatchData = formData as CreatePostData;
        }

        dispatchEvent = createPost;

        if (mode === 'edit') {
            dispatchData = Object.assign(formData, {
                id: post?.id,
                userId: post?.userId,
            });
            dispatchEvent = editPost;
        }

        dispatch(dispatchEvent(dispatchData as EditPostData))
            .then(() => {
                setFormData({
                    title: '',
                    body: '',
                });
                const messageType = mode === 'edit' ? 'изменён' : 'добавлен';
                alert(`Пост успешно ${messageType}!`);
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
                <label htmlFor="body">Body</label>
                <TextArea
                    name="body"
                    id="body"
                    value={formData.body}
                    className={styles.textarea}
                    onChange={(event) => handleChangeForm(event)}
                />
            </div>
            <Button>{buttonName}</Button>
        </form>
    );
};

export default CreateEditPostComponent;
