import React from 'react';
import { useParams } from 'react-router-dom';
import { EditAlbumComponent } from '~/src/components';

const EditAlbumPage = () => {
    const albumId = Number(useParams().id);

    return (
        <>
            <h2>Страница изменения альбома</h2>

            <EditAlbumComponent albumId={albumId} />
        </>
    );
};

export default EditAlbumPage;
