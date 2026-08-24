import { useNavigate } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi2'

const BackButton = () => {
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-display tracking-wider uppercase text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-200 group"
        >
            <HiArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            Назад
        </button>
    )
}

export default BackButton
