import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { MainPage } from '~/src/pages';
import { store } from '../store';

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <MainPage />
            </Provider>
        </BrowserRouter>
    );
};

export default App;
