import { api } from './api'
import type { ICategory } from '@/types/category/ICategory'

export const categoryApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<ICategory[], void>({
            query: () => 'categories',
            providesTags: ['Categories'],
        }),
    }),
})

export const { useGetCategoriesQuery } = categoryApi
