import React from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '~/src/uikit';

import styles from './styles.module.scss';

type EntityPageProps = {
    pageName: string;
    Component: JSX.Element;
    buttonClassName?: string;
};

const EntityPage = ({
    pageName,
    Component,
    buttonClassName,
}: EntityPageProps) => {
    const navigate = useNavigate();
    const currPath = useLocation().pathname;

    const handleCreateClick = () => {
        navigate(`${currPath}/create`);
    };

    return (
        <section className={styles.section}>
            <h2>{pageName}</h2>

            <div className={cn(styles.buttonBlock, buttonClassName)}>
                <Button
                    size="lg"
                    className={styles.createButton}
                    onClick={handleCreateClick}
                >
                    +
                </Button>
            </div>

            {Component}
        </section>
    );
};

export default EntityPage;
