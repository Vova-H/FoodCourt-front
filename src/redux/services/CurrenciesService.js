import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import URL_path from "../../../config";


export const currenciesAPI = createApi({
    reducerPath: 'currenciesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL_path}/currencies/`
    }),
    tagTypes: ['Currencies'],
    endpoints: (build) => ({
        getCurrencies: build.query({
            query: () => ({
                url: "/",
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
        }),
    })
});

export const {useGetCurrenciesQuery} = currenciesAPI;
