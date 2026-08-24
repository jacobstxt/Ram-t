import { HiSun, HiMoon } from 'react-icons/hi2'
import { useTheme } from '@/context/ThemeContext'
import { useState, useRef, useEffect } from 'react'

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme()
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node))
                setOpen(false)
        }
        document.addEventListener('mousedown', onClick)
        return () => document.removeEventListener('mousedown', onClick)
    }, [])

    const options = [
        { label: 'Світла', icon: <HiSun className="w-3.5 h-3.5" />, active: !isDark, action: () => { if (isDark) toggleTheme(); setOpen(false) } },
        { label: 'Темна', icon: <HiMoon className="w-3.5 h-3.5" />, active: isDark, action: () => { if (!isDark) toggleTheme(); setOpen(false) } },
    ]

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(v => !v)}
                aria-label="Тема"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:border-[#b8860b] dark:hover:border-[#f5c518] hover:text-[#b8860b] dark:hover:text-[#f5c518] transition-all duration-200"
            >
                {isDark ? <HiSun className="w-3.5 h-3.5" /> : <HiMoon className="w-3.5 h-3.5" />}
            </button>

            {open && (
                <div
                    className="absolute right-0 top-11 w-40 bg-[#f4f4f0] dark:bg-[#0f0f14] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl z-50 p-1.5"
                    style={{ animation: 'stepFadeIn 0.15s ease-out' }}
                >
                    <p className="px-3 pt-1.5 pb-2 text-[10px] font-display tracking-[0.15em] uppercase text-black/30 dark:text-white/30">
                        Тема
                    </p>
                    {options.map(opt => (
                        <button
                            key={opt.label}
                            onClick={opt.action}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-display tracking-wide transition-all duration-150 ${
                                opt.active
                                    ? 'text-[#f5c518] bg-[#f5c518]/10'
                                    : 'text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            <span className={`flex items-center justify-center w-6 h-6 rounded-lg ${opt.active ? 'bg-[#f5c518]/15' : 'bg-black/5 dark:bg-white/5'}`}>
                                {opt.icon}
                            </span>
                            {opt.label}
                            {opt.active && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#f5c518]" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ThemeToggle
