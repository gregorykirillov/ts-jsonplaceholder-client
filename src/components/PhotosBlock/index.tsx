import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '~/src/store';
import { selectPhotos } from '~/src/store/photos/selectors';
import Slider from '../Slider';
import { Preloader } from '~/src/uikit';

import styles from './styles.module.scss';

const PhotosBlock = ({ albumId }: { albumId: number }) => {
    const photos = useSelector((state: RootState) =>
        selectPhotos(state, albumId),
    );

    if (photos.length === 0) return <Preloader />;

    return (
        <div>
            Photos
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
        </div>
    );
};

export default PhotosBlock;
