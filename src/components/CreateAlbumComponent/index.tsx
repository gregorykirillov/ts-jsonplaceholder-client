import React, { FormEvent, useState } from 'react';

import { Button, Input } from '~/src/uikit';
import { createAlbum } from '~/src/store/albums';
import { useAppDispatch } from '~/src/store';

import styles from './styles.module.scss';

export type CreateAlbumData = {
    id: number;
    userId: number;
    title: string;
};

const CreateAlbumComponent = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<CreateAlbumData>({
        id: 0,
        userId: 0,
        title: '',
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

        dispatch(createAlbum(formData))
            .then(() => {
                setFormData({
                    id: 0,
                    userId: 0,
                    title: '',
                });
                alert(`Альбом успешно создан!`);
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
            <Button>Создать</Button>
        </form>
    );
};

export default CreateAlbumComponent;
