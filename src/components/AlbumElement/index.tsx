import { useState } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { AlbumType } from '~/src/types';
import PhotosBlock from '../PhotosBlock';
import { Button } from '~/src/uikit';

import { deleteAlbum } from '~/src/store/albums';
import { useAppDispatch } from '~/src/store';
import arrowSvg from './arrow.svg';
import deleteSvg from './delete.svg';
import editSvg from './edit.svg';

import styles from './styles.module.scss';

const AlbumElement = ({ album }: { album: AlbumType; albums: AlbumType[] }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currPath = useLocation().pathname;

    const [isAlbumVisible, setAlbumVisible] = useState(false);

    const toggleAlbum = () => {
        setAlbumVisible(!isAlbumVisible);
    };

    const handleEditAlbum = (id: number) => {
        navigate(`${currPath}/edit/${id}`);
    };

    const handleDeleteAlbum = (albumId: number) => {
        dispatch(deleteAlbum(albumId));
    };

    return (
        <div className={styles.albumELement}>
            <div className={styles.actionBlock}>
                <Button inline={true} onClick={() => handleEditAlbum(album.id)}>
                    <img className={styles.editSvg} src={editSvg} />
                </Button>
                <Button
                    inline={true}
                    onClick={() => handleDeleteAlbum(album.id)}
                >
                    <img className={styles.deleteSvg} src={deleteSvg} />
                </Button>
                <Button inline={true}>
                    <img
                        src={arrowSvg}
                        className={cn(styles.arrowSvg, {
                            [styles.active]: isAlbumVisible,
                        })}
                        onClick={() => toggleAlbum()}
                    />
                </Button>
            </div>
            <span className={styles.title}>{album.title}</span>
            {isAlbumVisible && <PhotosBlock albumId={album.id} />}
        </div>
    );
};

export default AlbumElement;
