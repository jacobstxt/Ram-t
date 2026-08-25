import { HiSun, HiMoon } from 'react-icons/hi2'
import { useTheme } from '@/context/ThemeContext'

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            aria-label="Змінити тему"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:border-[#b8860b] dark:hover:border-[#f5c518] hover:text-[#b8860b] dark:hover:text-[#f5c518] transition-all duration-200"
        >
            {isDark ? <HiSun className="w-3.5 h-3.5" /> : <HiMoon className="w-3.5 h-3.5" />}
        </button>
    )
}

export default ThemeToggle
