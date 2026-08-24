export interface ICharacteristic {
    key: string
    value: string
}

export interface IComposition {
    item: string
    qty: string
}

export interface IReview {
    authorName: string
    rating: number
    text: string
    createdAt: string
}

export interface IProduct {
    id: number
    name: string
    slug: string
    shortDescription: string
    description: string
    manufacturer: string
    warrantyYears: number | null
    price: number
    categoryId: number
    categoryName: string
    images: string[]
    composition: IComposition[]
    characteristics: ICharacteristic[]
    reviews: IReview[]
}

export interface IPagedResult<T> {
    items: T[]
    totalCount: number
    page: number
    pageSize: number
    totalPages: number
}

export interface IProductQueryParams {
    search?: string
    categoryId?: number
    sortBy?: string
    sortDir?: 'asc' | 'desc'
    page?: number
    pageSize?: number
}
