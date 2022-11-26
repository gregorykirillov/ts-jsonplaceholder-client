import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CreateEditPostComponent } from '~/src/components';
import { RootState, useAppDispatch } from '~/src/store';
import { fetchPost } from '~/src/store/posts';
import { selectPostById } from '~/src/store/posts/selectors';
import { Preloader } from '~/src/uikit';
const EditPostPage = () => {
    const postId = Number(useParams().id);
    const [isLoading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPost(postId)).finally(() => {
            setLoading(false);
        });
    }, []);

    const post = useSelector((state: RootState) =>
        selectPostById(state, postId),
    );

    if (isLoading) return <Preloader />;

    return (
        <>
            <h2>Изменение поста</h2>

            <CreateEditPostComponent mode="edit" post={post} />
        </>
    );
};

export default EditPostPage;
