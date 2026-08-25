import { Link } from 'react-router-dom'
import { HiChevronRight, HiHome } from 'react-icons/hi2'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'

const Breadcrumbs = () => {
    const crumbs = useBreadcrumbs()

    if (crumbs.length === 0) return null

    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8">
            <Link
                to="/"
                className="text-black/35 dark:text-white/35 hover:text-[#b8860b] dark:hover:text-[#f5c518] transition-colors"
            >
                <HiHome className="w-3.5 h-3.5" />
            </Link>

            {crumbs.map((crumb, i) => {
                const isLast = i === crumbs.length - 1
                return (
                    <span key={i} className="flex items-center gap-1.5">
                        <HiChevronRight className="w-3 h-3 text-black/20 dark:text-white/20 shrink-0" />
                        {crumb.to && !isLast ? (
                            <Link
                                to={crumb.to}
                                className="font-display text-xs tracking-wider uppercase text-black/40 dark:text-white/40 hover:text-[#b8860b] dark:hover:text-[#f5c518] transition-colors"
                            >
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="font-display text-xs tracking-wider uppercase text-black/70 dark:text-white/70 truncate max-w-52">
                                {crumb.label}
                            </span>
                        )}
                    </span>
                )
            })}
        </nav>
    )
}

export default Breadcrumbs
