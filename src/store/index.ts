import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { loggerMiddleware } from './middlewares/logger';
import { postSlice } from './posts';
import { commentSlice } from './comments';
import { albumSlice } from './albums';
import { photoSlice } from './photos';
import { userSlice } from './users';
import { todoSlice } from './todos';

const rootReducer = combineReducers({
    post: postSlice.reducer,
    comment: commentSlice.reducer,
    album: albumSlice.reducer,
    photo: photoSlice.reducer,
    user: userSlice.reducer,
    todo: todoSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([loggerMiddleware]),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
