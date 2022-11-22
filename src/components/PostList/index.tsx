import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PostElement from '../PostElement';
import { selectPosts } from '~/src/store/posts/selectors';
import { fetchPosts } from '~/src/store/posts';
import { RootState, useAppDispatch } from '~/src/store';
import { Preloader } from '~/src/uikit';
import { PostType } from '~/src/types/PostType';

import styles from './styles.module.scss';

const PostList = () => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPosts()).finally(() => setLoading(false));
    }, []);

    const posts = useSelector((state: RootState) => selectPosts(state));

    if (isLoading) return <Preloader />;

    return (
        <div className={styles.postList}>
            {posts?.map((post: PostType) => (
                <PostElement key={post.id} post={post} posts={posts} />
            ))}
        </div>
    );
};

export default PostList;
