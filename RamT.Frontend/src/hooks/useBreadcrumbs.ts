import { useLocation } from 'react-router-dom'
import { useGetProductBySlugQuery } from '@/services/productService'

export interface Breadcrumb {
    label: string
    to?: string
}

export const useBreadcrumbs = (): Breadcrumb[] => {
    const { pathname } = useLocation()
    const productMatch = pathname.match(/^\/products\/(.+)$/)
    const slug = productMatch ? productMatch[1] : undefined
    const { data: product } = useGetProductBySlugQuery(slug!, { skip: !slug })

    if (pathname === '/') return []

    if (pathname === '/products') {
        return [{ label: 'Каталог' }]
    }

    if (pathname.startsWith('/products/') && slug) {
        return [
            { label: 'Каталог', to: '/products' },
            ...(product ? [{ label: product.categoryName, to: `/products?categoryId=${product.categoryId}` }] : [{ label: '...' }]),
            { label: product?.name ?? '...' },
        ]
    }

    if (pathname === '/contacts') {
        return [{ label: 'Контакти' }]
    }

    return []
}
