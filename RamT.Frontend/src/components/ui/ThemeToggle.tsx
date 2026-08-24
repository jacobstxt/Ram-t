import { HiSun, HiMoon } from 'react-icons/hi2'
import { useTheme } from '@/context/ThemeContext'

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            aria-label="Перемкнути тему"
            className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:border-[#b8860b] dark:hover:border-[#f5c518] hover:text-[#b8860b] dark:hover:text-[#f5c518] transition-all duration-200"
        >
            {isDark
                ? <HiSun className="w-4 h-4" />
                : <HiMoon className="w-4 h-4" />
            }
        </button>
    )
}

export default ThemeToggle
