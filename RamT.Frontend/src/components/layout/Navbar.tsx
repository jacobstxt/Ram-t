import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '@/store/store.ts'
import logo from '@/assets/icons/ram-logo-yellow.svg'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const user = useAppSelector(state => state.auth.user)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#f5c518]/20 shadow-[0_4px_24px_rgba(245,197,24,0.06)]'
                    : 'bg-transparent border-b border-white/5'
            }`}
        >
            {/* top accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#f5c518] to-transparent opacity-80" />

            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src={logo}
                        alt="RAM-T"
                        className="h-8 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(245,197,24,0.6)]"
                    />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `relative text-sm font-medium tracking-widest uppercase transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-[#f5c518] after:transition-all after:duration-300 ${
                                isActive
                                    ? 'text-[#f5c518] after:w-full'
                                    : 'text-white/60 hover:text-white after:w-0 hover:after:w-full'
                            }`
                        }
                    >
                        Каталог
                    </NavLink>
                </nav>

                {/* Auth buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <span className="text-sm text-white/60 font-mono">
                            {user.firstName} {user.lastName}
                        </span>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-xs font-medium tracking-wider uppercase text-white/60 hover:text-white transition-colors duration-200 px-4 py-2"
                            >
                                Увійти
                            </Link>
                            <Link
                                to="/register"
                                className="text-xs font-medium tracking-wider uppercase text-[#0a0a0f] bg-[#f5c518] px-4 py-2 transition-all duration-200 hover:bg-[#f5c518]/90 hover:shadow-[0_0_16px_rgba(245,197,24,0.4)] active:scale-95"
                            >
                                Реєстрація
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile burger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(v => !v)}
                    aria-label="Меню"
                >
                    <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block h-px w-6 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
                <div className="bg-[#0a0a0f]/98 border-t border-white/5 px-6 py-4 flex flex-col gap-4">
                    <NavLink
                        to="/products"
                        onClick={() => setMenuOpen(false)}
                        className="text-sm font-medium tracking-widest uppercase text-white/60 hover:text-[#f5c518] transition-colors"
                    >
                        Каталог
                    </NavLink>
                    <div className="h-px bg-white/5" />
                    {!user && (
                        <div className="flex flex-col gap-3">
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-white/60 hover:text-white transition-colors">
                                Увійти
                            </Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[#f5c518]">
                                Реєстрація
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar
