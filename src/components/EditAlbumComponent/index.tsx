import React, { FormEvent, useEffect, useState } from 'react';

import { Button, Input, Preloader } from '~/src/uikit';
import { fetchAlbum, updateAlbum } from '~/src/store/albums';
import { RootState, useAppDispatch } from '~/src/store';

import { AlbumType } from '~/src/types';
import { useSelector } from 'react-redux';
import { selectAlbumById } from '~/src/store/albums/selectors';

import styles from './styles.module.scss';

type EditAlbumComponentProps = {
    albumId: number;
};

const EditAlbumComponent = ({ albumId }: EditAlbumComponentProps) => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    const album = useSelector((state: RootState) =>
        selectAlbumById(state, albumId),
    );

    useEffect(() => {
        dispatch(fetchAlbum(albumId)).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setFormData(album);
    }, [album]);

    const [formData, setFormData] = useState<AlbumType>({
        id: album?.id,
        userId: album?.userId,
        title: album?.title,
    });

    const handleChangeForm = (event: FormEvent) => {
        const input = event.target as HTMLInputElement;
        const inputName = input.name;
        const inputValue = input.value;

        setFormData({
            ...formData,
            [inputName]: inputValue,
        });
    };

    const handleSubmitForm = (event: FormEvent) => {
        event.preventDefault();

        dispatch(updateAlbum(formData))
            .then(() => {
                setFormData({
                    id: 0,
                    userId: 0,
                    title: '',
                });
                alert(`Альбом успешно изменён!`);
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
            <Button>Сохранить</Button>
        </form>
    );
};

export default EditAlbumComponent;
