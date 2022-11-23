import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '~/src/store';
import { fetchComments } from '~/src/store/comments';
import { PostType } from '~/src/types/PostType';
import { Button, Preloader } from '~/src/uikit';
import CommentsBlock from '../CommentsBlock';
import { fetchUserById } from '~/src/store/users';
import { selectUserById } from '~/src/store/users/selectors';

import commentSvg from './comment.svg';

import styles from './styles.module.scss';

const PostElement = ({ post }: { post: PostType; posts: PostType[] }) => {
    const [isCommentsVisible, setCommentsVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserById(post.userId));
    }, []);

    const user = useSelector((state: RootState) =>
        selectUserById(state, post.userId),
    );

    const toggleComments = (id: number) => {
        setLoading(true);

        dispatch(fetchComments(id)).then(() => {
            setLoading(false);
            setCommentsVisible(!isCommentsVisible);
        });
    };

    return (
        <div className={styles.postELement}>
            <div className={styles.infoBlock}>
                <span className={styles.username}>
                    {user?.username || 'Anonym'}
                </span>
            </div>
            <div className={styles.postTitle}>{post.title}</div>
            <div>{post.body}</div>
            <>
                {isLoading && <Preloader size="sm" />}
                {isCommentsVisible && <CommentsBlock postId={post.id} />}
            </>
            <Button inline={true} onClick={() => toggleComments(post.id)}>
                <img className={styles.commentSvg} src={commentSvg} />
            </Button>
        </div>
    );
};

export default PostElement;
