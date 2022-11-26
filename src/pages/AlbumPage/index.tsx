import React from 'react';

import { AlbumList } from '~/src/components';
import EntityPage from '~/src/components/EntityPage';

const AlbumPage = () => (
    <EntityPage pageName="AlbumPage" Component={<AlbumList />} />
);

export default AlbumPage;
