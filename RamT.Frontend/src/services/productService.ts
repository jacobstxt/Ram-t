import { api } from './api'
import type { IProduct, IPagedResult, IProductQueryParams } from '@/types/product/IProduct'

export const productApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<IPagedResult<IProduct>, IProductQueryParams>({
            query: (params) => ({
                url: 'products',
                params,
            }),
            providesTags: ['Products'],
        }),
        getProductById: build.query<IProduct, number>({
            query: (id) => `products/${id}`,
            providesTags: ['Products'],
        }),
    }),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi
