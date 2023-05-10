import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql/utilities';

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
      transformResponse: (response: { data: IntrospectionQuery }) =>
        buildClientSchema(response.data),
      transformErrorResponse: () => 'Failed to fetch schema. Please check your connection',
    }),
  }),
});

export const { useGetSchemaQuery } = apiSlice;
