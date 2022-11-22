import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '~/src/store';
import { selectPostComments } from '~/src/store/comments/selectors';

import styles from './styles.module.scss';

const CommentsBlock = ({ postId }: { postId: number }) => {
    const comments = useSelector((state: RootState) =>
        selectPostComments(state, postId),
    );

    return (
        <div className={styles.commentsBlock}>
            <span>Comments:</span>
            {comments.map(({ id, name, body }) => {
                return (
                    <div key={id}>
                        <strong>{name}</strong>
                        <p className={styles.commentText}>{body}</p>
                        <hr />
                    </div>
                );
            })}
        </div>
    );
};

export default CommentsBlock;
