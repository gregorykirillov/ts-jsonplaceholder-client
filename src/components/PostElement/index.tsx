import { useState } from 'react';

import { useAppDispatch } from '~/src/store';
import { fetchComments } from '~/src/store/comments';
import { PostType } from '~/src/types/PostType';
import { Preloader } from '~/src/uikit';
import CommentsBlock from '../CommentsBlock';

import commentSvg from './comment.svg';

import styles from './styles.module.scss';

const PostElement = ({ post }: { post: PostType; posts: PostType[] }) => {
    const [isCommentsVisible, setCommentsVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const toggleComments = (id: number) => {
        setLoading(true);

        dispatch(fetchComments(id)).then(() => {
            setLoading(false);
            setCommentsVisible(!isCommentsVisible);
        });
    };

    return (
        <div className={styles.postELement}>
            {post.title}
            <>
                {isLoading && <Preloader size="sm" />}
                {isCommentsVisible && <CommentsBlock postId={post.id} />}
            </>
            <span>
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
