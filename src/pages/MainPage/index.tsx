import { PostList } from '~/src/components';

import styles from './styles.module.scss';

const MainPage = () => {
    return (
        <div className={styles.content}>
            <h1>Admin panel</h1>

            <PostList />
        </div>
    );
};

export default MainPage;
