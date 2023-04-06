import {configureStore} from '@reduxjs/toolkit';
import {authAPI} from '../services/AuthService';
import {dishesAPI} from "../services/DishesService";
import {ordersAPI} from "../services/OrdersService";
import {usersAPI} from "../services/UsersService";
import authReducer from '../features/AuthSlice';
import langReducer from '../features/LangSlice';
import dishesReducer from '../features/DishesSlice';
import userReducer from "../features/UserSlice"
import cartReducer from "../features/CartSlice"

export const setupStore = () => {
    return configureStore({
        reducer: {
            [authAPI.reducerPath]: authAPI.reducer,
            [dishesAPI.reducerPath]: dishesAPI.reducer,
            [usersAPI.reducerPath]: usersAPI.reducer,
            [ordersAPI.reducerPath]: ordersAPI.reducer,
            dishesReducer,
            authReducer,
            langReducer,
            userReducer,
            cartReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([authAPI.middleware, dishesAPI.middleware, usersAPI.middleware, ordersAPI.middleware])
    });
};
