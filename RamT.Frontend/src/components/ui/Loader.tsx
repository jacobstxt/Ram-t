import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const TopProgressBar = () => {
    const location = useLocation()
    const [progress, setProgress] = useState(0)
    const [visible, setVisible] = useState(false)
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])

    const clearTimers = () => {
        timers.current.forEach(clearTimeout)
        timers.current = []
    }

    useEffect(() => {
        clearTimers()
        setProgress(0)
        setVisible(true)

        timers.current.push(setTimeout(() => setProgress(30), 50))
        timers.current.push(setTimeout(() => setProgress(70), 200))
        timers.current.push(setTimeout(() => setProgress(85), 500))
        timers.current.push(setTimeout(() => setProgress(100), 700))
        timers.current.push(setTimeout(() => { setVisible(false); setProgress(0) }, 1000))

        return () => clearTimers()
    }, [location.pathname])

    if (!visible) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '2px',
                width: `${progress}%`,
                background: '#f5c518',
                boxShadow: '0 0 8px #f5c518',
                transition: progress === 0 ? 'none' : progress === 100 ? 'width 0.2s ease' : 'width 0.4s ease',
                zIndex: 9999,
                borderRadius: '0 2px 2px 0',
            }}
        />
    )
}

// Inline спіннер
export const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }
    return (
        <svg className={`${sizes[size]} animate-spin text-[#f5c518]`} viewBox="0 0 24 24" fill="none">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" />
            <path className="opacity-90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
        </svg>
    )
}

// Повноекранний лоадер
const Loader = () => (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
        <div className="relative w-16 h-16">
            {/* Зовнішнє кільце */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
                <circle
                    cx="32" cy="32" r="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-black/10 dark:text-white/10"
                />
                <circle
                    cx="32" cy="32" r="28"
                    fill="none"
                    stroke="#f5c518"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="175.9"
                    strokeDashoffset="132"
                    style={{ animation: 'spin-dash 1.4s ease-in-out infinite' }}
                />
            </svg>
            {/* Bolt по центру */}
            <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#f5c518]" style={{ animation: 'pulse-bolt 1.4s ease-in-out infinite' }}>
                    <path d="M13 2L4.5 13.5H11L10 22L19.5 10H13L13 2Z" />
                </svg>
            </div>
        </div>

        <span className="font-display text-xs tracking-[0.3em] uppercase text-black/30 dark:text-white/30">
            Завантаження
        </span>

        <style>{`
            @keyframes spin-dash {
                0%   { stroke-dashoffset: 175.9; transform: rotate(0deg); }
                50%  { stroke-dashoffset: 44;    transform: rotate(180deg); }
                100% { stroke-dashoffset: 175.9; transform: rotate(360deg); }
            }
            @keyframes pulse-bolt {
                0%, 100% { opacity: 0.5; transform: scale(0.9); }
                50%       { opacity: 1;   transform: scale(1.1); }
            }
        `}</style>
    </div>
)

export default Loader
