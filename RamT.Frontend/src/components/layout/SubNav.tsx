import { NavLink } from 'react-router-dom'

const links = [
    { label: 'Каталог товарів', to: '/products' },
    { label: 'Галерея робіт', to: '/gallery' },
    { label: 'Прайс', to: '/price' },
    { label: 'Про нас', to: '/about' },
    { label: 'Контакти', to: '/contacts' },
]

const SubNav = () => {
    return (
        <div className="border-t border-black/5 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 h-10 overflow-x-auto scrollbar-none">
                {links.map(({ label, to }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `shrink-0 px-3 py-1 rounded-lg font-display text-sm tracking-wide transition-colors duration-150 ${
                                isActive
                                    ? 'text-[#f5c518] bg-[#f5c518]/10'
                                    : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                            }`
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default SubNav
