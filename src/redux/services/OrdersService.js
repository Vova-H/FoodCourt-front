import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const ordersAPI = createApi({
    reducerPath: 'ordersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://192.168.0.191:3000/orders/`
    }),
    tagTypes: ['Orders'],
    endpoints: (build) => ({
        createOrder: build.mutation({
            query: ({clientId, body}) => ({
                    url: `create/?clientId=${clientId}`,
                    method: 'POST',
                    body: body,
                }),
        }),
        getOrders: build.query({
            query: (clientId) =>
                ({
                    url: `getOrderByClientId/?clientId=${clientId}`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }),
        }),
    })
});

export const {useCreateOrderMutation, useGetOrdersQuery} = ordersAPI;
