import { api } from './api'

interface CreateReviewDto {
    text: string
    rating: number
}

export const reviewApi = api.injectEndpoints({
    endpoints: (build) => ({
        createReview: build.mutation<void, { productId: number; body: CreateReviewDto }>({
            query: ({ productId, body }) => ({
                url: `review/${productId}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Products'],
        }),
    }),
})

export const { useCreateReviewMutation } = reviewApi
