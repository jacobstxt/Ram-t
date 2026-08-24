import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7274/api',
    credentials: 'include',
  }),
  tagTypes: ['Products', 'Categories'],
  endpoints: () => ({}),
})
