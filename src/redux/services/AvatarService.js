import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {URL} from "./config";

export const avatarAPI = createApi({
    reducerPath: 'avatarAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL}/avatars/`
    }),
    tagTypes: ['Avatar'],
    endpoints: (builder) => ({
        changeAvatar: builder.mutation({
            query: (formData) => ({
                url: 'change',
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
        }),
    })
});

export const {useChangeAvatarMutation} = avatarAPI;
