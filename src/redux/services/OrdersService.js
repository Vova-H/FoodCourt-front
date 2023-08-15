import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import URL_path from "../../../config";
import * as SecureStore from "expo-secure-store";


export const ordersAPI = createApi({
    reducerPath: 'ordersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL_path}/orders/`,
        prepareHeaders: async (headers) => {
            const token = await SecureStore.getItemAsync("token")
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Orders'],
    endpoints: (build) => ({
        createOrder: build.mutation({
            query: ({clientId, body, lang, discount}) => ({
                url: `create/?clientId=${clientId}&lang=${lang}&discount=${discount}`,
                method: 'POST',
                body: body,
            })
        }),
        getOrders: build.query({
            query: (data) =>
                ({
                    url: `getOrderByClientId/?clientId=${data.clientId}&lang=${data.lang}`,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }),
        }),
    })
});

export const {useCreateOrderMutation, useGetOrdersQuery} = ordersAPI;
