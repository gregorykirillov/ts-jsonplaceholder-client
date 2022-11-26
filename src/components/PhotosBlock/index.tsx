import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '~/src/store';
import { selectPhotos } from '~/src/store/photos/selectors';
import Slider from '../Slider';
import { fetchPhotos } from '~/src/store/photos';
import { Preloader } from '~/src/uikit';

import styles from './styles.module.scss';

const PhotosBlock = ({ albumId }: { albumId: number }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchPhotos(albumId)).finally(() => {
            setLoading(false);
        });
    }, []);

    const photos = useSelector((state: RootState) =>
        selectPhotos(state, albumId),
    );

    if (isLoading) return <Preloader />;

    return (
        <div className={styles.photosBlock}>
            Photos
            {photos.length ? (
                <Slider>
                    {photos.map((photo) => {
                        return (
                            <img
                                key={photo.id}
                                className={styles.photo}
                                src={photo.thumbnailUrl}
                                alt={photo.title}
                            />
                        );
                    })}
                </Slider>
            ) : (
                <span>Нет фотографий</span>
            )}
        </div>
    );
};

export default PhotosBlock;
