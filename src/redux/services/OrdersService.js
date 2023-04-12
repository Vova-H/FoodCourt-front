import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP_ADDRESS} from "../../../myConfig";

export const ordersAPI = createApi({
    reducerPath: 'ordersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${IP_ADDRESS}/orders/`
    }),
    tagTypes: ['Orders'],
    endpoints: (build) => ({
        createOrder: build.mutation({
            query: (payload) =>
                ({
                    url: `create/?clientId=${payload.userId}`,
                    method: 'POST',
                    body: [
                        payload.body
                    ],
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
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
