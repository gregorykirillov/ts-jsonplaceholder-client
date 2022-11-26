import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { ALBUMS_PATH, POSTS_PATH, TODOS_PATH } from '~/src/routes';

import styles from './styles.module.scss';

const navPaths = [
    {
        title: 'Главная',
        to: '/',
    },
    {
        title: 'Посты',
        to: POSTS_PATH,
    },
    {
        title: 'Альбомы',
        to: ALBUMS_PATH,
    },
    {
        title: 'Задачи',
        to: TODOS_PATH,
    },
];

function Header() {
    const path = useLocation().pathname;
    const isActive = (link: string) =>
        link !== '/' ? path.includes(link) : path === '/';

    return (
        <header className={styles.header}>
            <div className={cn('container', styles.header__section)}>
                <h2 className={styles.logo}>Admin panel</h2>

                <nav className={styles.nav}>
                    <ul className={styles.navlist}>
                        {navPaths.map((navItem) => (
                            <li
                                key={navItem.title}
                                className={cn(styles.navlist__item, {
                                    [styles.active]: isActive(navItem.to),
                                })}
                            >
                                <Link className={styles.link} to={navItem.to}>
                                    {navItem.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
