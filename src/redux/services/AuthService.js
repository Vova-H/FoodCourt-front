import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://foodcourt-deploy.onrender.com/auth/`
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (formData) => ({
                url: 'registration',
                method: 'POST',
                body: formData,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            }),
        }),

        login: builder.mutation({
            query: (payload) => ({
                url: 'login',
                method: 'POST',
                body: {
                    email: payload.email,
                    password: payload.password,
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }),
            invalidatesTags: ['Auth']
        })
    })
});

export const {useRegisterMutation, useLoginMutation} = authAPI;
