import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/AuthSlice';
import {authAPI} from '../services/AuthService';

export const setupStore = () => {
    return configureStore({
        reducer: {
            [authAPI.reducerPath]: authAPI.reducer,
            authReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([authAPI.middleware])
    });
};
