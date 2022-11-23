import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '~/src/store';
import { selectPostComments } from '~/src/store/comments/selectors';
import Comment from '../Comment';

import styles from './styles.module.scss';

const CommentsBlock = ({ postId }: { postId: number }) => {
    const comments = useSelector((state: RootState) =>
        selectPostComments(state, postId),
    );

    return (
        <div className={styles.commentsBlock}>
            <span>Comments:</span>
            {comments.map(({ id, name, body, kids }) => {
                return <Comment key={id} name={name} body={body} kids={kids} />;
            })}
        </div>
    );
};

export default CommentsBlock;
