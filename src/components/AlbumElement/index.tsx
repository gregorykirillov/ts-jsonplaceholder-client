import { useState } from 'react';

import { useAppDispatch } from '~/src/store';
import { fetchPhotos } from '~/src/store/photos';
import { AlbumType } from '~/src/types/AlbumType';
import { Preloader } from '~/src/uikit';
import PhotosBlock from '../PhotosBlock';

import styles from './styles.module.scss';

const AlbumElement = ({ album }: { album: AlbumType; albums: AlbumType[] }) => {
    const [isPhotosVisible, setPhotosVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const togglePhotos = (id: number) => {
        setLoading(true);

        dispatch(fetchPhotos(id)).then(() => {
            setLoading(false);
            setPhotosVisible(true);
        });
    };

    return (
        <div
            className={styles.albumELement}
            onClick={() => togglePhotos(album.id)}
        >
            {album.title}
            <>
                {isLoading && <Preloader size="sm" />}
                {isPhotosVisible && <PhotosBlock albumId={album.id} />}
            </>
        </div>
    );
};

export default AlbumElement;
