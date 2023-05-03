import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const cartsAPI = createApi({
    reducerPath: 'cartsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://192.168.0.191:3000/carts`
    }),
    tagTypes: ['Carts'],
    endpoints: (build) => ({
        getCart: build.query({
            query: (userId) => ({
                url: `/get/?userId=${userId}`,
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
        }),

        addCart: build.mutation({
            query: (payload) => ({
                url: '/add',
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
                url: `/removeOne`,
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
