import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import {
    AlbumPage,
    CreatePostPage,
    MainPage,
    PostPage,
    TodoPage,
    EditPostPage,
    EditTodoPage,
    CreateTodoPage,
    EditAlbumpage,
} from '~/src/pages';
import { store } from '../store';
import { Header } from '../parts';

import styles from './styles.module.scss';
import CreateAlbumPage from '../pages/CreateAlbumPage';

const App = () => {
    return (
        <Provider store={store}>
            <Header />

            <div className={styles.container}>
                <Routes>
                    <Route index element={<MainPage />} />
                    <Route path="posts">
                        <Route index element={<PostPage />} />
                        <Route path="create" element={<CreatePostPage />} />
                        <Route path="edit/:id" element={<EditPostPage />} />
                    </Route>
                    <Route path="albums">
                        <Route index element={<AlbumPage />} />
                        <Route path="create" element={<CreateAlbumPage />} />
                        <Route path="edit/:id" element={<EditAlbumpage />} />
                    </Route>
                    <Route path="todos">
                        <Route index element={<TodoPage />} />
                        <Route path="create" element={<CreateTodoPage />} />
                        <Route path="edit/:id" element={<EditTodoPage />} />
                    </Route>
                </Routes>
            </div>
        </Provider>
    );
};

export default App;
