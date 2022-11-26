import React from 'react';
import reactDom from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App';
const root = reactDom.createRoot(document.getElementById('root') as Element);

root.render(
    <HashRouter>
        <App />
    </HashRouter>,
);
