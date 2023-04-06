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
                    url: '/create',
                    method: 'POST',
                    body: [
                        payload
                    ],
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }),
        }),
    })
});

export const {useCreateOrderMutation} = ordersAPI;
