import { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/store'
import logo from '@/assets/icons/ram-logo-yellow.svg'

const PageLoadingOverlay = () => {
    const isLoading = useAppSelector(state => state.auth.isLoading)
    const [visible, setVisible] = useState(true)
    const [rendered, setRendered] = useState(true)
    const [phase, setPhase] = useState<'flicker' | 'reveal' | 'fill'>('flicker')
    const mountedAt = useState(() => performance.now())[0]
    const MIN_DISPLAY_MS = 1200

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('reveal'), 120)
        const t2 = setTimeout(() => setPhase('fill'), 400)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [])

    useEffect(() => {
        if (!isLoading) {
            const elapsed = performance.now() - mountedAt
            const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed)

            const t = setTimeout(() => {
                setVisible(false)
                setTimeout(() => setRendered(false), 500)
            }, remaining)
            return () => clearTimeout(t)
        }
    }, [isLoading])

    if (!rendered) return null

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f4f4f0] dark:bg-[#0a0a0f]"
            style={{
                transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: visible ? 1 : 0,
            }}
        >
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '48px 48px',
                }}
            />

            {/* Horizontal scan line */}
            <div
                className="absolute left-0 right-0 h-px bg-[#f5c518]/30"
                style={{
                    top: '50%',
                    boxShadow: '0 0 20px 2px rgba(245,197,24,0.15)',
                    animation: 'scan 2s ease-in-out infinite',
                }}
            />

            <div className="relative flex flex-col items-center gap-8">
                {/* Logo */}
                <div
                    style={{
                        opacity: phase === 'flicker' ? 0 : 1,
                        filter: phase === 'reveal'
                            ? 'drop-shadow(0 0 20px rgba(245,197,24,0.9)) brightness(1.4)'
                            : 'drop-shadow(0 0 8px rgba(245,197,24,0.4))',
                        transition: phase === 'reveal'
                            ? 'opacity 0.05s, filter 0.3s'
                            : 'opacity 0.05s, filter 0.6s ease-out',
                        animation: phase === 'reveal' ? 'logoFlicker 0.25s steps(1) forwards' : undefined,
                    }}
                >
                    <img src={logo} alt="RAM-T" className="w-16 h-16" />
                </div>

                {/* Brand name with fill animation */}
                <div className="relative overflow-hidden">
                    <span className="font-display font-bold text-[11px] tracking-[0.5em] uppercase text-black/15 dark:text-white/15 select-none">
                        RAM&#8209;T
                    </span>
                    <span
                        className="absolute inset-0 font-display font-bold text-[11px] tracking-[0.5em] uppercase text-[#f5c518] select-none"
                        style={{
                            clipPath: phase === 'fill' ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                            transition: phase === 'fill' ? 'clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                        }}
                    >
                        RAM&#8209;T
                    </span>
                </div>

                {/* Bottom progress line */}
                <div className="w-24 h-px bg-black/10 dark:bg-white/10 relative overflow-hidden rounded-full">
                    <div
                        className="absolute inset-y-0 left-0 bg-[#f5c518] rounded-full"
                        style={{
                            width: phase === 'fill' ? '100%' : '0%',
                            transition: phase === 'fill' ? 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                            boxShadow: '0 0 6px rgba(245,197,24,0.6)',
                        }}
                    />
                </div>
            </div>

            <style>{`
                @keyframes logoFlicker {
                    0%   { opacity: 0 }
                    20%  { opacity: 1 }
                    35%  { opacity: 0 }
                    50%  { opacity: 1 }
                    65%  { opacity: 0 }
                    80%  { opacity: 1 }
                    100% { opacity: 1 }
                }
                @keyframes scan {
                    0%   { transform: translateY(-120px); opacity: 0 }
                    20%  { opacity: 1 }
                    80%  { opacity: 1 }
                    100% { transform: translateY(120px); opacity: 0 }
                }
            `}</style>
        </div>
    )
}

export default PageLoadingOverlay
