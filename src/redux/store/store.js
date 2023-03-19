import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/AuthSlice';
import {authAPI} from '../services/AuthService';
import langReducer from './reducers/LangSlice';

export const setupStore = () => {
    return configureStore({
        reducer: {
            [authAPI.reducerPath]: authAPI.reducer,
            authReducer,
            langReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([authAPI.middleware])
    });
};
