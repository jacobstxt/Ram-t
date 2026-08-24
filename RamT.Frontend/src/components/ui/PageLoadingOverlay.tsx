import { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/store'
import logo from '@/assets/icons/ram-logo-yellow.svg'

const PageLoadingOverlay = () => {
    const isLoading = useAppSelector(state => state.auth.isLoading)
    const [visible, setVisible] = useState(true)
    const [rendered, setRendered] = useState(true)

    useEffect(() => {
        if (!isLoading) {
            setVisible(false)
            const t = setTimeout(() => setRendered(false), 400)
            return () => clearTimeout(t)
        }
    }, [isLoading])

    if (!rendered) return null

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f4f4f0] dark:bg-[#0a0a0f] transition-opacity duration-400"
            style={{ opacity: visible ? 1 : 0 }}
        >
            <div className="flex flex-col items-center gap-5">
                <div className="relative w-14 h-14">
                    <img src={logo} alt="" className="w-14 h-14" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#f5c518] animate-spin" />
                </div>
                <span className="font-display text-xs tracking-[0.3em] uppercase text-black/30 dark:text-white/30 animate-pulse">
                    Завантаження
                </span>
            </div>
        </div>
    )
}

export default PageLoadingOverlay
