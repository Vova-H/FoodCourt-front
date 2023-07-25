import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import URL_path from "../../../config";
import * as SecureStore from "expo-secure-store";
import {logoutUser} from "../features/AuthSlice";


export const dishesAPI = createApi({
    reducerPath: 'dishesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL_path}/dishes`,
        prepareHeaders: async (headers) => {
            const token = await SecureStore.getItemAsync("token")
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    tagTypes: ['Dishes'],
    endpoints: (build) => ({
        getAllDishes: build.query({
            query: (lang) => ({
                url: `/?lang=${lang}`,
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
        }),

        getAllFavorites: build.query({
            query: (id) => ({
                url: `favorites/getAll/?userId=${id}`,
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
        }),

        checkIsFavorites: build.mutation({
            query: (payload) => ({
                url: 'favorites/check',
                method: 'POST',
                body: {
                    userId: payload.userId,
                    dishId: payload.dishId
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
        }),
        addToFavorites: build.mutation({
            query: (payload) => ({
                url: 'favorites/add',
                method: 'POST',
                body: {
                    userId: payload.userId,
                    dishId: payload.dishId
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
        }),
        removeFromFavorites: build.mutation({
            query: (payload) => ({
                url: 'favorites/remove',
                method: 'POST',
                body: {
                    userId: payload.userId,
                    dishId: payload.dishId
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
        })
    })
});

export const {
    useGetAllDishesQuery,
    useCheckIsFavoritesMutation,
    useAddToFavoritesMutation,
    useRemoveFromFavoritesMutation,
    useGetAllFavoritesQuery
} = dishesAPI;
