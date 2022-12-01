import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AlbumElement from '../AlbumElement';
import { selectAlbums } from '~/src/store/albums/selectors';
import { fetchAlbums } from '~/src/store/albums';
import { RootState, useAppDispatch } from '~/src/store';
import { Preloader } from '~/src/uikit';
import { AlbumType } from '~/src/types';
import { handleScroll } from './handleScroll';
import { useScroll } from '~/src/hooks/useScroll';

import styles from './styles.module.scss';

const AlbumList = () => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useScroll(() => handleScroll({ dispatch }));

    useEffect(() => {
        dispatch(fetchAlbums()).finally(() => setLoading(false));
    }, []);

    const albums = useSelector((state: RootState) => selectAlbums(state));

    if (isLoading) return <Preloader />;

    return (
        <div className={styles.albumList}>
            {albums?.map((album: AlbumType) => (
                <AlbumElement key={album.id} album={album} albums={albums} />
            ))}
        </div>
    );
};

export default AlbumList;
