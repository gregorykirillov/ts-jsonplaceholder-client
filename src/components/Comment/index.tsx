import React from 'react';
import { CommentType } from '~/src/types/CommentType';

import styles from './styles.module.scss';

const Comment = ({
    name,
    body,
    kids,
}: {
    name: string;
    body: string;
    kids: CommentType[];
}) => {
    return (
        <div className={styles.commentBlock}>
            <strong className={styles.name}>{name}</strong>
            <p className={styles.commentText}>{body}</p>
            <hr />
            {kids.map(({ id, name, body, kids }) => (
                <Comment key={id} name={name} body={body} kids={kids} />
            ))}
        </div>
    );
};

export default Comment;
