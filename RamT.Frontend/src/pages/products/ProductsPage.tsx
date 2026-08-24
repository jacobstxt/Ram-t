import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMagnifyingGlass, HiXMark, HiChevronDown } from 'react-icons/hi2'
import { useGetProductsQuery } from '@/services/productService'
import { useGetCategoriesQuery } from '@/services/categoryService'
import type { ICategory } from '@/types/category/ICategory'

const APP_IMAGE_URL = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_APP_IMAGE_URL

const CategoryItem = ({
    cat,
    selectedId,
    onSelect,
    depth = 0,
}: {
    cat: ICategory
    selectedId: number | undefined
    onSelect: (id: number | undefined) => void
    depth?: number
}) => {
    const [open, setOpen] = useState(false)
    const hasChildren = cat.subCategories.length > 0

    return (
        <li>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onSelect(selectedId === cat.id ? undefined : cat.id)}
                    className={`flex-1 text-left text-sm px-3 py-1.5 rounded-lg transition-colors duration-150 font-display ${
                        selectedId === cat.id
                            ? 'bg-[#f5c518] text-[#0a0a0f] font-semibold'
                            : 'text-black/70 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                >
                    {cat.name}
                </button>
                {hasChildren && (
                    <button
                        onClick={() => setOpen(v => !v)}
                        className="p-1 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
                    >
                        <HiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                    </button>
                )}
            </div>
            {hasChildren && open && (
                <ul className="ml-4 mt-1 flex flex-col gap-1 animate-slide-down">
                    {cat.subCategories.map(sub => (
                        <CategoryItem
                            key={sub.id}
                            cat={sub}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            depth={depth + 1}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}

const CategoryTree = ({
    categories,
    selectedId,
    onSelect,
}: {
    categories: ICategory[]
    selectedId: number | undefined
    onSelect: (id: number | undefined) => void
}) => (
    <ul className="flex flex-col gap-1">
        {categories.map(cat => (
            <CategoryItem key={cat.id} cat={cat} selectedId={selectedId} onSelect={onSelect} />
        ))}
    </ul>
)

const ProductsPage = () => {
    const [search, setSearch] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [categoryId, setCategoryId] = useState<number | undefined>()
    const [page, setPage] = useState(1)

    const { data: categories } = useGetCategoriesQuery()
    const { data, isLoading, isFetching } = useGetProductsQuery({
        search: search || undefined,
        categoryId,
        page,
        pageSize: 12,
    })

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setSearch(searchInput)
        setPage(1)
    }

    const handleCategory = (id: number | undefined) => {
        setCategoryId(id)
        setPage(1)
    }

    const handleClear = () => {
        setSearch('')
        setSearchInput('')
        setCategoryId(undefined)
        setPage(1)
    }

    const hasFilters = !!search || !!categoryId

    return (
        <div className="bg-[#f4f4f0] dark:bg-[#0a0a0f] min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-12">


                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-px bg-[#b8860b] dark:bg-[#f5c518]" />
                        <span className="font-display text-xs tracking-[0.3em] uppercase text-[#b8860b] dark:text-[#f5c518]">
                            RAM-T
                        </span>
                    </div>
                    <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] text-black dark:text-white leading-tight">
                        Каталог товарів
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">

                    {/* Sidebar */}
                    <aside className="flex flex-col gap-6">

                        {/* Search */}
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                placeholder="Пошук товарів..."
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 pr-10 text-sm text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-[#f5c518]/50 transition-colors"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 hover:text-[#b8860b] dark:hover:text-[#f5c518] transition-colors">
                                <HiMagnifyingGlass className="w-4 h-4" />
                            </button>
                        </form>

                        {/* Clear filters */}
                        {hasFilters && (
                            <button
                                onClick={handleClear}
                                className="flex items-center gap-2 text-xs font-display tracking-wider uppercase text-black/40 dark:text-white/40 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            >
                                <HiXMark className="w-4 h-4" />
                                Скинути фільтри
                            </button>
                        )}

                        {/* Categories */}
                        {categories && categories.length > 0 && (
                            <div>
                                <span className="font-display text-xs font-medium tracking-[0.25em] uppercase text-[#b8860b] dark:text-[#f5c518] block mb-3">
                                    Категорії
                                </span>
                                <button
                                    onClick={() => handleCategory(undefined)}
                                    className={`text-left w-full text-sm px-3 py-1.5 rounded-lg transition-colors duration-150 font-display mb-1 ${
                                        !categoryId
                                            ? 'bg-[#f5c518] text-[#0a0a0f] font-semibold'
                                            : 'text-black/70 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                                    }`}
                                >
                                    Всі категорії
                                </button>
                                <CategoryTree
                                    categories={categories}
                                    selectedId={categoryId}
                                    onSelect={handleCategory}
                                />
                            </div>
                        )}
                    </aside>

                    {/* Products grid */}
                    <div>
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="bg-black/5 dark:bg-white/5 rounded-xl h-72 animate-pulse" />
                                ))}
                            </div>
                        ) : !data?.items.length ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-4">
                                <span className="text-5xl">🔍</span>
                                <p className="font-display text-lg text-black/40 dark:text-white/40">Товарів не знайдено</p>
                            </div>
                        ) : (
                            <>
                                <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 transition-opacity duration-200 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
                                    {data.items.map(product => (
                                        <Link
                                            key={product.id}
                                            to={`/products/${product.slug}`}
                                            className="group bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden hover:bg-[#f5c518]/5 border border-transparent hover:border-[#f5c518]/20 transition-all duration-300"
                                        >
                                            {/* Image */}
                                            <div className="h-64 bg-black/5 dark:bg-white/5 overflow-hidden">
                                                {product.images.length > 0 ? (
                                                    <img
                                                        src={`${APP_IMAGE_URL}/1200_${product.images[0]}`}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-4xl opacity-20">⚡</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="p-5">
                                                <span className="text-xs font-mono text-black/40 dark:text-white/40 uppercase tracking-wider">
                                                    {product.categoryName}
                                                </span>
                                                <h3 className="font-display font-semibold text-base text-black dark:text-white mt-1 mb-2 group-hover:text-[#b8860b] dark:group-hover:text-[#f5c518] transition-colors line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <p className="text-xs text-black/50 dark:text-white/50 line-clamp-2 mb-4">
                                                    {product.shortDescription}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-display font-bold text-lg text-black dark:text-white">
                                                        {product.price.toLocaleString('uk-UA')} ₴
                                                    </span>
                                                    <span className="font-display text-xs tracking-wider uppercase text-[#b8860b] dark:text-[#f5c518] group-hover:underline">
                                                        Детальніше →
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {data.totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-10">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="font-display text-sm px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:border-[#f5c518] hover:text-[#b8860b] dark:hover:text-[#f5c518] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        >
                                            ←
                                        </button>

                                        {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setPage(p)}
                                                className={`font-display text-sm w-9 h-9 rounded-lg border transition-all ${
                                                    p === page
                                                        ? 'bg-[#f5c518] text-[#0a0a0f] border-[#f5c518] font-semibold'
                                                        : 'border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:border-[#f5c518] hover:text-[#b8860b] dark:hover:text-[#f5c518]'
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                                            disabled={page === data.totalPages}
                                            className="font-display text-sm px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:border-[#f5c518] hover:text-[#b8860b] dark:hover:text-[#f5c518] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        >
                                            →
                                        </button>
                                    </div>
                                )}

                                <p className="text-center text-xs text-black/30 dark:text-white/30 font-mono mt-4">
                                    {data.totalCount} товарів · сторінка {page} з {data.totalPages}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage
