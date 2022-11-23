import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PostList } from '~/src/components';
import { Button } from '~/src/uikit';

import styles from './styles.module.scss';

const PostPage = () => {
    const navigate = useNavigate();
    const currPath = useLocation().pathname;

    const handleCreateClick = () => {
        navigate(`${currPath}/create`);
    };
    return (
        <>
            <h2>PostPage</h2>

            <div className={styles.buttonBlock}>
                <Button
                    size="lg"
                    className={styles.createButton}
                    onClick={handleCreateClick}
                >
                    +
                </Button>
            </div>

            <PostList />
        </>
    );
};

export default PostPage;
