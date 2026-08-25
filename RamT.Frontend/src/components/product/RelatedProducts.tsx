import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlinePhoto, HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useGetProductsQuery } from '@/services/productService.ts'

const APP_IMAGE_URL = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_APP_IMAGE_URL

interface RelatedProductsProps {
    categoryId: number
    currentProductId: number
    categoryName: string
}

const RelatedProducts = ({ categoryId, currentProductId, categoryName }: RelatedProductsProps) => {
    const { data, isLoading } = useGetProductsQuery({ categoryId, pageSize: 9 })
    const scrollRef = useRef<HTMLDivElement>(null)

    const related = data?.items.filter(p => p.id !== currentProductId)

    if (isLoading || !related || related.length === 0) return null

    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return
        const cardWidth = scrollRef.current.querySelector('a')?.offsetWidth ?? 180
        scrollRef.current.scrollBy({ left: dir === 'right' ? cardWidth * 2 : -cardWidth * 2, behavior: 'smooth' })
    }

    return (
        <div className="mt-16 pt-10 border-t border-black/10 dark:border-white/10">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-px bg-[#b8860b] dark:bg-[#f5c518]" />
                    <span className="font-display text-xs tracking-[0.3em] uppercase text-[#b8860b] dark:text-[#f5c518]">
                        Схожі товари
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-black/40 dark:text-white/40 hover:border-[#f5c518]/50 hover:text-[#f5c518] transition-all"
                    >
                        <HiChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-black/40 dark:text-white/40 hover:border-[#f5c518]/50 hover:text-[#f5c518] transition-all"
                    >
                        <HiChevronRight className="w-4 h-4" />
                    </button>
                    <Link
                        to={`/products?categoryId=${categoryId}`}
                        className="font-display text-xs tracking-widest uppercase text-black/40 dark:text-white/40 hover:text-[#f5c518] transition-colors ml-1"
                    >
                        {categoryName} →
                    </Link>
                </div>
            </div>

            <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-1 scrollbar-none">
                {related.map(product => (
                    <Link
                        key={product.id}
                        to={`/products/${product.slug}`}
                        className="group flex flex-col gap-3 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-xl overflow-hidden hover:border-[#f5c518]/30 transition-all duration-200 shrink-0"
                        style={{ width: 'calc(20% - 13px)' }}
                    >
                        <div className="aspect-square bg-black/5 dark:bg-white/5 overflow-hidden">
                            {product.images[0] ? (
                                <img
                                    src={`${APP_IMAGE_URL}/400_${product.images[0]}`}
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <HiOutlinePhoto className="w-8 h-8 text-black/10 dark:text-white/10" />
                                </div>
                            )}
                        </div>
                        <div className="px-3 pb-3 flex flex-col gap-1">
                            <span className="font-display text-sm font-medium text-black dark:text-white leading-tight line-clamp-2 group-hover:text-[#b8860b] dark:group-hover:text-[#f5c518] transition-colors">
                                {product.name}
                            </span>
                            <span className="font-display font-bold text-sm text-[#b8860b] dark:text-[#f5c518]">
                                {product.price.toLocaleString('uk-UA')} ₴
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts
