import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { AlbumPage, MainPage, PostPage } from '~/src/pages';
import { store } from '../store';
import { Header } from '../parts';

import styles from './styles.module.scss';

const App = () => {
    return (
        <Provider store={store}>
            <Header />

            <div className={styles.container}>
                <Routes>
                    <Route index element={<MainPage />} />
                    <Route path="/posts" element={<PostPage />} />
                    <Route path="/albums" element={<AlbumPage />} />
                </Routes>
            </div>
        </Provider>
    );
};

export default App;
