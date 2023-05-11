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
      transformErrorResponse: () => 'Failed to fetch schema. Please check your connection',
    }),
    getResponse: builder.query({
      query: ({ url, query, variables, headers }) => ({
        url,
        method: 'POST',
        headers: {
          ...headers,
        },
        body: { query, variables },
      }),
    }),
  }),
});

export const { useGetSchemaQuery, useLazyGetResponseQuery } = apiSlice;
