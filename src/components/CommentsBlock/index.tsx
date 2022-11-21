import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '~/src/store';
import { selectPostComments } from '~/src/store/comments/selectors';
import { CommentType } from '~/src/types/CommentType';

import styles from './styles.module.scss';

const CommentsBlock = ({ postId }: { postId: number }) => {
    const comments = Object.values(
        useSelector((state: RootState) => selectPostComments(state, postId)),
    ) as CommentType[];

    return (
        <div className={styles.commentsBlock}>
            {comments.map(({ id, name, body }) => {
                return (
                    <div className={styles.comment} key={id}>
                        <div>
                            <strong>{name}</strong>
                        </div>
                        {body}
                    </div>
                );
            })}
        </div>
    );
};

export default CommentsBlock;
