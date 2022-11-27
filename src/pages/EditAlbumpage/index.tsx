import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { EditAlbumComponent, Slider } from '~/src/components';
import { ALBUMS_PATH } from '~/src/routes';
import { RootState, useAppDispatch } from '~/src/store';
import { fetchAlbum, updateAlbum } from '~/src/store/albums';
import { selectAlbumById } from '~/src/store/albums/selectors';
import { fetchPhotos } from '~/src/store/photos';
import { deletePhoto } from '~/src/store/photos/deletephoto';
import { selectPhotos } from '~/src/store/photos/selectors';
import { AlbumType } from '~/src/types';
import { Button, Preloader } from '~/src/uikit';
import deleteSvg from '~/public/icons/delete.svg';

import styles from './styles.module.scss';

const EditAlbumPage = () => {
    const albumId = Number(useParams().id);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const album = useSelector((state: RootState) =>
        selectAlbumById(state, albumId),
    );

    const photos = useSelector((state: RootState) =>
        selectPhotos(state, albumId),
    );

    useEffect(() => {
        const promises = [
            dispatch(fetchAlbum(albumId)),
            dispatch(fetchPhotos(albumId)),
        ];

        Promise.all(promises).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setFormData(album);
    }, [album]);

    const [formData, setFormData] = useState<AlbumType>({
        id: album?.id,
        userId: album?.userId,
        title: album?.title,
    });

    const handleDeleteImg = (photoId: number) => {
        dispatch(deletePhoto(photoId));
    };

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
                navigate(ALBUMS_PATH);
            })
            // eslint-disable-next-line no-console
            .catch((err) => console.log(err));
        return;
    };

    if (isLoading) return <Preloader />;

    return (
        <>
            <h2>Изменение альбома</h2>

            <EditAlbumComponent
                title={formData.title}
                onSubmitForm={handleSubmitForm}
                onChangeForm={handleChangeForm}
            />

            <Slider>
                {photos.map((photo) => {
                    return (
                        <div className={styles.photoWrapper} key={photo.id}>
                            <img
                                className={styles.photo}
                                src={photo.thumbnailUrl}
                                alt={photo.title}
                            />

                            <Button
                                inline={true}
                                className={styles.deleteButton}
                                onClick={() => handleDeleteImg(photo.id)}
                            >
                                <img
                                    className={styles.deleteSvg}
                                    src={deleteSvg}
                                />
                            </Button>
                        </div>
                    );
                })}
            </Slider>
        </>
    );
};

export default EditAlbumPage;
