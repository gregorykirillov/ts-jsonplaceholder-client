import { useState } from 'react';
import cn from 'classnames';

import { useAppDispatch } from '~/src/store';
import { fetchPhotos } from '~/src/store/photos';
import { AlbumType } from '~/src/types/AlbumType';
import { Preloader } from '~/src/uikit';
import PhotosBlock from '../PhotosBlock';

import arrowSvg from './arrow.svg';
import styles from './styles.module.scss';

const AlbumElement = ({ album }: { album: AlbumType; albums: AlbumType[] }) => {
    const [isAlbumVisible, setAlbumVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const toggleAlbum = (id: number) => {
        setAlbumVisible(!isAlbumVisible);
        setLoading(true);

        dispatch(fetchPhotos(id)).then(() => {
            setLoading(false);
        });
    };

    return (
        <div className={styles.albumELement}>
            <img
                src={arrowSvg}
                className={cn(styles.arrowSvg, {
                    [styles.active]: isAlbumVisible,
                })}
                onClick={() => toggleAlbum(album.id)}
            />
            {album.title}
            <>
                {isLoading && <Preloader size="sm" />}
                {isAlbumVisible && <PhotosBlock albumId={album.id} />}
            </>
        </div>
    );
};

export default AlbumElement;
