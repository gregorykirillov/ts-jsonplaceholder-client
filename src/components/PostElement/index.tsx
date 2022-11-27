import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { RootState, useAppDispatch } from '~/src/store';
import { fetchComments } from '~/src/store/comments';
import { PostType } from '~/src/types';
import { Button, Preloader } from '~/src/uikit';
import CommentsBlock from '../CommentsBlock';
import { fetchUserById } from '~/src/store/users';
import { deletePost } from '~/src/store/posts';
import { selectUserById } from '~/src/store/users/selectors';

import commentSvg from '~/public/icons/comment.svg';
import deleteSvg from '~/public/icons/delete.svg';
import editSvg from '~/public/icons/edit.svg';

import styles from './styles.module.scss';

const PostElement = ({ post }: { post: PostType; posts: PostType[] }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currPath = useLocation().pathname;

    const [isCommentsVisible, setCommentsVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchUserById(post.userId));
    }, []);

    const user = useSelector((state: RootState) =>
        selectUserById(state, post.userId),
    );

    const handleDeletePost = (id: number) => {
        dispatch(deletePost(id));
    };

    const handleEditPost = (id: number) => {
        navigate(`${currPath}/edit/${id}`);
    };

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
            <div className={styles.actionBlock}>
                <Button inline={true} onClick={() => handleEditPost(post.id)}>
                    <img className={styles.editSvg} src={editSvg} />
                </Button>
                <Button inline={true} onClick={() => handleDeletePost(post.id)}>
                    <img className={styles.deleteSvg} src={deleteSvg} />
                </Button>
            </div>
            <Button inline={true} onClick={() => toggleComments(post.id)}>
                <img className={styles.commentSvg} src={commentSvg} />
            </Button>
        </div>
    );
};

export default PostElement;
