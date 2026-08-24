import { api } from './api'
import type { IAccount } from '@/types/Account/IAccount'

interface LoginDto {
    email: string
    password: string
}

interface RegisterDto {
    firstName: string
    lastName: string
    email: string
    password: string
}

export const accountApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<IAccount, LoginDto>({
            query: (body) => ({ url: 'auth/login', method: 'POST', body }),
            invalidatesTags: ['CurrentUser'],
        }),
        register: build.mutation<IAccount, RegisterDto>({
            query: (body) => ({ url: 'auth/register', method: 'POST', body }),
            invalidatesTags: ['CurrentUser'],
        }),
        logout: build.mutation<void, void>({
            query: () => ({ url: 'auth/logout', method: 'POST' }),
            invalidatesTags: ['CurrentUser'],
        }),
        refresh: build.mutation<IAccount, void>({
            query: () => ({ url: 'auth/refresh', method: 'POST' }),
        }),
        googleAuth: build.mutation<IAccount, { idToken: string }>({
            query: (body) => ({ url: 'auth/google', method: 'POST', body }),
            invalidatesTags: ['CurrentUser'],
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useRefreshMutation, useGoogleAuthMutation } = accountApi
