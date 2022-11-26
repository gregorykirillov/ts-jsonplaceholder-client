import React from 'react';

import { AlbumList } from '~/src/components';
import EntityPage from '~/src/components/EntityPage';

import styles from './styles.module.scss';

const AlbumPage = () => (
    <EntityPage
        pageName="Альбомы"
        Component={<AlbumList />}
        buttonClassName={styles.buttonBlock}
    />
);

export default AlbumPage;
