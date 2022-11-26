import React from 'react';

import { PostList } from '~/src/components';
import EntityPage from '~/src/components/EntityPage';

const PostPage = () => (
    <EntityPage pageName="PostPage" Component={<PostList />} />
);

export default PostPage;
