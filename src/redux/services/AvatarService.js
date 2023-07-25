import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import URL_path from "../../../config";
import * as SecureStore from "expo-secure-store";


export const avatarAPI = createApi({
    reducerPath: 'avatarAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL_path}/avatars/`
    }),
    prepareHeaders: async (headers) => {
        const token = await SecureStore.getItemAsync("token")
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
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
