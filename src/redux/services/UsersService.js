import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://foodcourt-deploy.onrender.com/users`
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: (id) => {
                return {
                    url: `/user/?id=${id}`,
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }

                };
            },
            invalidatesTags: ['Users']
        }),
    })
});

export const {useGetUserByIdQuery} = usersAPI;
