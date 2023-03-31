import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP_ADDRESS} from "../../../myConfig";

export const dishesAPI = createApi({
    reducerPath: 'dishesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${IP_ADDRESS}/dishes/`
    }),
    tagTypes: ['Dishes'],
    endpoints: (build) => ({
        getAllDishes: build.query({
            query: () => ({
                url: "/",
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
        }),

        getAllFavorites: build.query({
            query: (id) => ({
                url: `favorites/getAll/?userId=${id}`,
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
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
