import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HiOutlinePhoto, HiChevronLeft, HiChevronRight, HiOutlineShieldCheck, HiOutlineCube, HiOutlineStar, HiOutlineClipboard } from 'react-icons/hi2'
import { useGetProductBySlugQuery } from '@/services/productService'
import BackButton from '@/components/ui/BackButton'
import Loader from '@/components/ui/Loader'

const APP_IMAGE_URL = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_APP_IMAGE_URL

const ProductPage = () => {
    const { slug } = useParams<{ slug: string }>()
    const { data: product, isLoading, isError } = useGetProductBySlugQuery(slug!)
    const [activeImage, setActiveImage] = useState(0)
    const [activeTab, setActiveTab] = useState<'characteristics' | 'composition' | 'reviews'>('characteristics')

    if (isLoading) return <Loader />

    if (isError || !product) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center gap-4">
                <HiOutlinePhoto className="w-16 h-16 text-black/20 dark:text-white/20" />
                <p className="font-display text-lg text-black/40 dark:text-white/40">Товар не знайдено</p>
                <Link to="/products" className="font-display text-sm tracking-wider uppercase text-[#b8860b] dark:text-[#f5c518] hover:underline">
                    ← Повернутись до каталогу
                </Link>
            </div>
        )
    }

    const images = product.images
    const prevImage = () => setActiveImage(i => (i - 1 + images.length) % images.length)
    const nextImage = () => setActiveImage(i => (i + 1) % images.length)

    const tabs = [
        { key: 'characteristics', label: 'Характеристики', icon: HiOutlineClipboard, count: product.characteristics.length },
        { key: 'composition', label: 'Склад', icon: HiOutlineCube, count: product.composition.length },
        { key: 'reviews', label: 'Відгуки', icon: HiOutlineStar, count: product.reviews.length },
    ] as const

    return (
        <div className="bg-[#f4f4f0] dark:bg-[#0a0a0f] min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Breadcrumb */}
                <div className="flex items-center gap-3 mb-8">
                    <BackButton />
                    <span className="text-black/20 dark:text-white/20">·</span>
                    <Link to="/products" className="font-display text-xs tracking-wider uppercase text-black/40 dark:text-white/40 hover:text-[#b8860b] dark:hover:text-[#f5c518] transition-colors">
                        Каталог
                    </Link>
                    <span className="text-black/20 dark:text-white/20">·</span>
                    <span className="font-display text-xs tracking-wider uppercase text-black/60 dark:text-white/60 truncate max-w-48">
                        {product.name}
                    </span>
                </div>

                {/* Main block */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                    {/* Gallery */}
                    <div className="flex flex-col gap-4">
                        <div className="relative aspect-square bg-black/5 dark:bg-white/5 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
                            {images.length > 0 ? (
                                <>
                                    <img
                                        key={activeImage}
                                        src={`${APP_IMAGE_URL}/1200_${images[activeImage]}`}
                                        alt={product.name}
                                        className="w-full h-full object-contain"
                                        style={{ animation: 'fadeIn 0.25s ease' }}
                                    />
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-black/10 dark:border-white/10 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:border-[#f5c518] transition-all"
                                            >
                                                <HiChevronLeft className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-black/10 dark:border-white/10 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:border-[#f5c518] transition-all"
                                            >
                                                <HiChevronRight className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <HiOutlinePhoto className="w-16 h-16 text-black/10 dark:text-white/10" />
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                            i === activeImage
                                                ? 'border-[#f5c518]'
                                                : 'border-transparent opacity-50 hover:opacity-80'
                                        }`}
                                    >
                                        <img src={`${APP_IMAGE_URL}/200_${img}`} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-px bg-[#b8860b] dark:bg-[#f5c518]" />
                            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#b8860b] dark:text-[#f5c518]">
                                {product.categoryName}
                            </span>
                        </div>

                        <h1 className="font-display font-bold text-[clamp(24px,3vw,40px)] text-black dark:text-white leading-tight">
                            {product.name}
                        </h1>

                        {product.shortDescription && (
                            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed border-l-2 border-[#f5c518]/40 pl-4">
                                {product.shortDescription}
                            </p>
                        )}

                        <div className="flex items-end gap-2 py-4 border-y border-black/10 dark:border-white/10">
                            <span className="font-display font-bold text-4xl text-black dark:text-white">
                                {product.price.toLocaleString('uk-UA')}
                            </span>
                            <span className="font-display text-xl text-black/50 dark:text-white/50 mb-1">₴</span>
                        </div>

                        <div className="flex flex-col gap-3">
                            {product.manufacturer && (
                                <div className="flex items-center justify-between">
                                    <span className="font-display text-xs tracking-wider uppercase text-black/40 dark:text-white/40">Виробник</span>
                                    <span className="font-display font-semibold text-sm text-black dark:text-white">{product.manufacturer}</span>
                                </div>
                            )}
                            {product.warrantyYears && (
                                <div className="flex items-center justify-between">
                                    <span className="font-display text-xs tracking-wider uppercase text-black/40 dark:text-white/40">Гарантія</span>
                                    <div className="flex items-center gap-1.5">
                                        <HiOutlineShieldCheck className="w-4 h-4 text-[#f5c518]" />
                                        <span className="font-display font-semibold text-sm text-black dark:text-white">
                                            {product.warrantyYears} {product.warrantyYears === 1 ? 'рік' : 'роки'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 mt-2">
                            <a
                                href="tel:+380975757520"
                                className="flex items-center justify-center w-full py-3.5 rounded-xl bg-[#f5c518] hover:bg-[#e6b800] text-[#0a0a0f] font-display font-bold text-sm tracking-wider uppercase transition-colors duration-200"
                            >
                                Замовити дзвінок
                            </a>
                            <a
                                href="https://t.me/ramt_ua"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center w-full py-3.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-[#f5c518]/50 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white font-display text-sm tracking-wider uppercase transition-all duration-200"
                            >
                                Написати в Telegram
                            </a>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                {(product.characteristics.length > 0 || product.composition.length > 0 || product.reviews.length > 0) && (
                    <div>
                        <div className="flex gap-1 border-b border-black/10 dark:border-white/10 mb-8">
                            {tabs.map(tab => tab.count > 0 && (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-2 px-5 py-3 font-display text-sm tracking-wider uppercase border-b-2 -mb-px transition-all ${
                                        activeTab === tab.key
                                            ? 'border-[#f5c518] text-black dark:text-white'
                                            : 'border-transparent text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70'
                                    }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                    <span className="text-xs opacity-50">({tab.count})</span>
                                </button>
                            ))}
                        </div>

                        {activeTab === 'characteristics' && product.characteristics.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {product.characteristics.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                                        <span className="text-xs text-black/50 dark:text-white/50 font-display tracking-wide">{c.key}</span>
                                        <span className="text-sm font-display font-semibold text-black dark:text-white">{c.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'composition' && product.composition.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <div className="grid grid-cols-[1fr_100px] gap-4 px-4 py-2">
                                    <span className="font-display text-xs tracking-wider uppercase text-black/40 dark:text-white/40">Назва</span>
                                    <span className="font-display text-xs tracking-wider uppercase text-black/40 dark:text-white/40 text-right">К-сть</span>
                                </div>
                                {product.composition.map((c, i) => (
                                    <div key={i} className="grid grid-cols-[1fr_100px] gap-4 px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                                        <span className="text-sm text-black dark:text-white font-display">{c.item}</span>
                                        <span className="text-sm font-display font-semibold text-black dark:text-white text-right">{c.qty}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'reviews' && product.reviews.length > 0 && (
                            <div className="flex flex-col gap-4">
                                {product.reviews.map((r, i) => (
                                    <div key={i} className="p-5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-display font-semibold text-sm text-black dark:text-white">{r.authorName}</span>
                                            <div className="flex items-center gap-0.5">
                                                {Array.from({ length: 5 }).map((_, j) => (
                                                    <HiOutlineStar key={j} className={`w-3.5 h-3.5 ${j < r.rating ? 'text-[#f5c518] fill-[#f5c518]' : 'text-black/20 dark:text-white/20'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">{r.text}</p>
                                        <span className="text-xs text-black/30 dark:text-white/30 font-mono mt-2 block">
                                            {new Date(r.createdAt).toLocaleDateString('uk-UA')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Description */}
                {product.description && (
                    <div className="mt-12 pt-10 border-t border-black/10 dark:border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-6 h-px bg-[#b8860b] dark:bg-[#f5c518]" />
                            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#b8860b] dark:text-[#f5c518]">Опис</span>
                        </div>
                        <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed max-w-3xl whitespace-pre-line">
                            {product.description}
                        </p>
                    </div>
                )}
            </div>

            <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
        </div>
    )
}

export default ProductPage
