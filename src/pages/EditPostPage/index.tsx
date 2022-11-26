import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CreateEditPostComponent } from '~/src/components';
import { RootState, useAppDispatch } from '~/src/store';
import { fetchPost } from '~/src/store/posts';
import { selectPostById } from '~/src/store/posts/selectors';
const EditPostPage = () => {
    const postId = Number(useParams().id);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPost(postId));
    }, []);

    const post = useSelector((state: RootState) =>
        selectPostById(state, postId),
    );

    return (
        <>
            <h2>Страница изменения поста</h2>

            <CreateEditPostComponent mode="edit" post={post} />
        </>
    );
};

export default EditPostPage;
