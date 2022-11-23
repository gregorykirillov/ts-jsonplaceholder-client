import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import {
    AlbumPage,
    CreatePostPage,
    MainPage,
    PostPage,
    TodoPage,
} from '~/src/pages';
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
                    <Route path="/posts">
                        <Route index element={<PostPage />} />
                        <Route path="create" element={<CreatePostPage />} />
                    </Route>
                    <Route path="/albums" element={<AlbumPage />} />
                    <Route path="/todos" element={<TodoPage />} />
                </Routes>
            </div>
        </Provider>
    );
};

export default App;
