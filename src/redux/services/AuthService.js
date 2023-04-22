import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://foodcourt-deploy.onrender.com/auth/`
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        registration: builder.mutation({
            query: (payload) => ({
                url: '/registration',
                method: 'POST',
                body: {
                    username: payload.username,
                    email: payload.email,
                    password: payload.password,
                    avatar: payload.avatar
                },
                headers: {
                    'Content-Type': `multipart/form-data`,
                }
            }),
            invalidatesTags: ['Auth']
        }),

        login: builder.mutation({
            query: (payload) => ({
                url: '/login',
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

export const {useRegistrationMutation, useLoginMutation} = authAPI;
