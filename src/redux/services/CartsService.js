import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import URL_path from "../../../config";
import * as SecureStore from "expo-secure-store";


export const cartsAPI = createApi({
    reducerPath: 'cartsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL_path}/carts`,
        prepareHeaders: async (headers) => {
            const token = await SecureStore.getItemAsync("token")
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Carts'],
    endpoints: (build) => ({
        getCart: build.query({
            query: (data) => ({
                url: `/get/?userId=${data.userId}&lang=${data.lang}`,
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
        }),

        addCart: build.mutation({
            query: (payload) => ({
                url: `/add?lang=${payload.lang}`,
                method: 'POST',
                body: {
                    userId: payload.userId,
                    dishId: payload.dishId,
                    quantity: payload.quantity
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
        }),

        removeCart: build.mutation({
            query: (payload) => ({
                url: `/remove`,
                method: 'POST',
                body: {
                    userId: payload.userId
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
        }),

        removeOneFromCart: build.mutation({
            query: (payload) => ({
                url: `/removeOne?lang=${payload.lang}`,
                method: 'POST',
                body: {
                    userId: payload.userId,
                    cartItemId: payload.cartItemId
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
        }),
    })
});

export const {
    useGetCartQuery,
    useAddCartMutation,
    useRemoveCartMutation,
    useRemoveOneFromCartMutation
} = cartsAPI;
