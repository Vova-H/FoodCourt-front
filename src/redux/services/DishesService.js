import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IP_ADDRESS} from "../../../myConfig";

export const dishesAPI = createApi({
    reducerPath: 'dishesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${IP_ADDRESS}/dishes`
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
            invalidatesTags: ['Dishes']
        }),
    })
});

export const {useGetAllDishesQuery} = dishesAPI;
