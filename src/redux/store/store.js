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
import orderReducer from "../features/OrdersSlice"
import orderModalReducer from "../features/OrderModalSlice"
import {cartsAPI} from "../services/CartsService";
import {avatarAPI} from "../services/AvatarService";

export const setupStore = () => {
    return configureStore({
        reducer: {
            [authAPI.reducerPath]: authAPI.reducer,
            [dishesAPI.reducerPath]: dishesAPI.reducer,
            [usersAPI.reducerPath]: usersAPI.reducer,
            [ordersAPI.reducerPath]: ordersAPI.reducer,
            [cartsAPI.reducerPath]: cartsAPI.reducer,
            [avatarAPI.reducerPath]: avatarAPI.reducer,
            dishesReducer,
            authReducer,
            langReducer,
            userReducer,
            cartReducer,
            orderReducer,
            orderModalReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([
                authAPI.middleware, dishesAPI.middleware, usersAPI.middleware,
                ordersAPI.middleware, cartsAPI.middleware, avatarAPI.middleware
            ])
    });
};
