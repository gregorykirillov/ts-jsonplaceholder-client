import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

// import { cartSlice } from './cart';
// import { restaurantSlice } from './restaurant';
// import { dishSlice } from './dish';
// import { userSlice } from './user';
// import { reviewSlice } from './review';
import { postSlice } from './posts';
import { commentSlice } from './comments';
import { loggerMiddleware } from './middlewares/logger';

const rootReducer = combineReducers({
    post: postSlice.reducer,
    comment: commentSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([loggerMiddleware]),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
