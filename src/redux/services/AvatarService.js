import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const avatarAPI = createApi({
    reducerPath: 'avatarAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://foodcourt-deploy.onrender.com/avatars/`
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
