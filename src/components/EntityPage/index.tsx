import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '~/src/uikit';

import styles from './styles.module.scss';

type EntityPageProps = {
    pageName: string;
    Component: JSX.Element;
};

const EntityPage = ({ pageName, Component }: EntityPageProps) => {
    const navigate = useNavigate();
    const currPath = useLocation().pathname;

    const handleCreateClick = () => {
        navigate(`${currPath}/create`);
    };

    return (
        <>
            <h2>{pageName}</h2>

            <div className={styles.buttonBlock}>
                <Button
                    size="lg"
                    className={styles.createButton}
                    onClick={handleCreateClick}
                >
                    +
                </Button>
            </div>

            {Component}
        </>
    );
};

export default EntityPage;
