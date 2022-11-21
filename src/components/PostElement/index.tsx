import { useState } from 'react';
import { useAppDispatch } from '~/src/store';
import { fetchComments } from '~/src/store/comments';
import { PostType } from '~/src/types/PostType';
import CommentsBlock from '../CommentsBlock';

import commentSvg from './comment.svg';

import styles from './styles.module.scss';

const PostElement = ({ post }: { post: PostType; posts: PostType[] }) => {
    const [isCommentsVisible, setCommentsVisible] = useState(false);
    const dispatch = useAppDispatch();

    const toggleComments = (id: number) => {
        dispatch(fetchComments(id));
        setCommentsVisible(!isCommentsVisible);
    };

    return (
        <div className={styles.postELement}>
            {post.title}
            {isCommentsVisible && <CommentsBlock postId={post.id} />}
            <span className={styles.commentsButton}>
                <img
                    className={styles.commentSvg}
                    onClick={() => toggleComments(post.id)}
                    src={commentSvg}
                />
            </span>
        </div>
    );
};

export default PostElement;
