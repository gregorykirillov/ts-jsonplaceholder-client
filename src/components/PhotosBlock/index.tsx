import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';

import { RootState } from '~/src/store';
import { selectPhotos } from '~/src/store/photos/selectors';

import styles from './styles.module.scss';

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
};

const PhotosBlock = ({ albumId }: { albumId: number }) => {
    const photos = useSelector((state: RootState) =>
        selectPhotos(state, albumId),
    );

    return (
        <div>
            Photos
            <Slider {...sliderSettings}>
                {photos.map((photo) => {
                    return (
                        <div key={photo.id}>
                            <img
                                className={styles.photo}
                                src={photo.thumbnailUrl}
                                alt={photo.title}
                            />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default PhotosBlock;
