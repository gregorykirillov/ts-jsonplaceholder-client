import React from 'react';

import { CreateEditPostComponent } from '~/src/components';

const CreatePostPage = () => {
    return (
        <>
            <h2>Создание поста</h2>

            <CreateEditPostComponent mode="create" />
        </>
    );
};

export default CreatePostPage;
