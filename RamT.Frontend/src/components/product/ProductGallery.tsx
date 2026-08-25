import { useState, useEffect } from 'react'
import { HiOutlinePhoto, HiChevronLeft, HiChevronRight, HiArrowsPointingOut, HiXMark } from 'react-icons/hi2'

interface ProductGalleryProps {
    images: string[]
    name: string
    imageBaseUrl: string
}

const ProductGallery = ({ images, name, imageBaseUrl }: ProductGalleryProps) => {
    const [active, setActive] = useState(0)
    const [lightbox, setLightbox] = useState(false)
    const prev = () => setActive(i => (i - 1 + images.length) % images.length)
    const next = () => setActive(i => (i + 1) % images.length)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()
            if (e.key === 'Escape') setLightbox(false)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [images.length])

    if (images.length === 0) {
        return (
            <div className="aspect-square bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-black/5 dark:border-white/5">
                <HiOutlinePhoto className="w-16 h-16 text-black/10 dark:text-white/10" />
            </div>
        )
    }

    return (
        <>
            <div className="flex gap-3">
                {/* Thumbnails — vertical left */}
                {images.length > 1 && (
                    <div className="flex flex-col gap-2 w-16 shrink-0">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 shrink-0 ${
                                    i === active
                                        ? 'border-[#f5c518] opacity-100'
                                        : 'border-transparent opacity-40 hover:opacity-70'
                                }`}
                            >
                                <img
                                    src={`${imageBaseUrl}/200_${img}`}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                                {i === active && (
                                    <div className="absolute inset-0 ring-1 ring-inset ring-[#f5c518]/30 rounded-lg" />
                                )}
                            </button>
                        ))}
                    </div>
                )}


                <div className="flex-1 flex flex-col gap-2">
                    <div
                        className="relative aspect-square bg-black/5 dark:bg-white/5 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 group cursor-pointer"
                        onClick={() => setLightbox(true)}
                    >
                        <img
                            key={active}
                            src={`${imageBaseUrl}/1200_${images[active]}`}
                            alt={name}
                            className="w-full h-full object-contain"
                            draggable={false}
                        />


                        {images.length > 1 && (
                            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/30 backdrop-blur-sm">
                                <span className="font-mono text-[11px] text-white/80">
                                    {active + 1} / {images.length}
                                </span>
                            </div>
                        )}


                        <button
                            onClick={e => { e.stopPropagation(); setLightbox(true) }}
                            className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                            <HiArrowsPointingOut className="w-4 h-4" />
                        </button>


                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={e => { e.stopPropagation(); prev() }}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/80 dark:bg-black/70 backdrop-blur-sm border border-black/10 dark:border-white/10 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-[#f5c518] hover:border-[#f5c518]/50 transition-all opacity-0 group-hover:opacity-100 duration-200"
                                >
                                    <HiChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={e => { e.stopPropagation(); next() }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/80 dark:bg-black/70 backdrop-blur-sm border border-black/10 dark:border-white/10 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-[#f5c518] hover:border-[#f5c518]/50 transition-all opacity-0 group-hover:opacity-100 duration-200"
                                >
                                    <HiChevronRight className="w-4 h-4" />
                                </button>
                            </>
                        )}
                    </div>


                    {images.length > 1 && (
                        <div className="flex justify-center gap-1.5 pt-1">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className={`rounded-full transition-all duration-200 ${
                                        i === active
                                            ? 'w-4 h-1.5 bg-[#f5c518]'
                                            : 'w-1.5 h-1.5 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-md flex items-center justify-center"
                    onClick={() => setLightbox(false)}
                >
                    <button
                        onClick={() => setLightbox(false)}
                        className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    >
                        <HiXMark className="w-5 h-5" />
                    </button>

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={e => { e.stopPropagation(); prev() }}
                                className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            >
                                <HiChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={e => { e.stopPropagation(); next() }}
                                className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            >
                                <HiChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    <img
                        key={active}
                        src={`${imageBaseUrl}/1200_${images[active]}`}
                        alt={name}
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                        style={{ animation: 'fadeIn 0.2s ease' }}
                        onClick={e => e.stopPropagation()}
                        draggable={false}
                    />

                    {images.length > 1 && (
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={e => { e.stopPropagation(); setActive(i) }}
                                    className={`rounded-full transition-all duration-200 ${
                                        i === active
                                            ? 'w-5 h-1.5 bg-[#f5c518]'
                                            : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default ProductGallery
