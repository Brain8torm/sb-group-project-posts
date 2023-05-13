import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import api from '../utils/api';

const store = configureStore({
    reducer: {
        //posts: productReducer,
        user: userReducer,
        //singlePost: singleProductReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: api,
            },
        }),
});

export default store;