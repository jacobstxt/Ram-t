import { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/store'
import logo from '@/assets/icons/ram-logo-yellow.svg'

const PageLoadingOverlay = () => {
    const isLoading = useAppSelector(state => state.auth.isLoading)
    const [visible, setVisible] = useState(true)
    const [rendered, setRendered] = useState(true)
    const mountedAt = useState(() => performance.now())[0]
    const MIN_DISPLAY_MS = 1200

    useEffect(() => {
        if (!isLoading) {
            const remaining = Math.max(0, MIN_DISPLAY_MS - (performance.now() - mountedAt))
            const t = setTimeout(() => {
                setVisible(false)
                setTimeout(() => setRendered(false), 400)
            }, remaining)
            return () => clearTimeout(t)
        }
    }, [isLoading])

    if (!rendered) return null

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f4f4f0] dark:bg-[#0a0a0f]"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}
        >
            <div className="flex flex-col items-center gap-5">
                <div className="relative flex items-center justify-center w-16 h-16">
                    <img src={logo} alt="RAM-T" className="w-10 h-10" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#f5c518] animate-spin" />
                </div>
                <span className="font-display text-xs tracking-[0.3em] uppercase text-black/60 dark:text-white/60 animate-pulse">
                    Завантаження
                </span>
            </div>
        </div>
    )
}

export default PageLoadingOverlay
