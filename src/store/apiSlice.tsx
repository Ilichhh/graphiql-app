import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIntrospectionQuery } from 'graphql/utilities';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getSchema: builder.query({
      query: (url) => ({
        url,
        method: 'POST',
        body: { query: getIntrospectionQuery() },
      }),
    }),
    getResponse: builder.mutation({
      query: ({ url, query, variables, headers }) => ({
        url,
        method: 'POST',
        headers: {
          ...headers,
        },
        body: { query, variables: variables },
      }),
      transformResponse: (response, meta) => {
        return {
          data: JSON.stringify(response, null, 2),
          status: meta?.response?.status,
        };
      },
    }),
  }),
});

export const { useGetSchemaQuery, useGetResponseMutation } = apiSlice;
