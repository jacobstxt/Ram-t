import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store/store.ts'
import { setUser } from '@/store/slices/authSlice'
import { HiSun, HiMoon, HiArrowRightOnRectangle, HiShoppingBag, HiShoppingCart } from 'react-icons/hi2'
import { selectCartCount } from '@/store/slices/cartSlice'
import { useTheme } from '@/context/ThemeContext'
import { useCart } from '@/context/CartContext'
import ThemeToggle from '@/components/ui/ThemeToggle'
import SubNav from '@/components/layout/SubNav'
import Modal from '@/components/ui/Modal'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'
import { useLogoutMutation } from '@/services/accountService'
import logo from '@/assets/icons/ram-logo-yellow.svg'

type ModalType = 'login' | 'register' | null

const Navbar = () => {
    const dispatch = useAppDispatch()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeModal, setActiveModal] = useState<ModalType>(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
                setDropdownOpen(false)
        }
        document.addEventListener('mousedown', onClick)
        return () => document.removeEventListener('mousedown', onClick)
    }, [])
    const user = useAppSelector(state => state.auth.user)
    const cartCount = useAppSelector(selectCartCount)
    const { isDark, toggleTheme } = useTheme()
    const { open: openCart } = useCart()
    const [logout] = useLogoutMutation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleLogout = async () => {
        await logout()
        dispatch(setUser(null))
    }

    const closeModal = () => setActiveModal(null)

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#f5c518]/20 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(245,197,24,0.06)]'
                        : 'bg-transparent border-b border-black/5 dark:border-white/5'
                }`}
            >
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#f5c518] to-transparent opacity-80" />

                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src={logo}
                            alt="RAM-T"
                            className="h-8 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(245,197,24,0.6)]"
                        />
                    </Link>

                    <div className="hidden md:flex flex-col items-center gap-0.5">
                        <a href="tel:+380970956306" className="font-mono text-sm font-medium text-black/80 dark:text-white/80 hover:text-[#f5c518] transition-colors">
                            +38 097 095 63 06
                        </a>
                        <span className="font-display text-[10px] tracking-widest uppercase text-black/35 dark:text-white/35">
                            Пн–Пт &nbsp;9:00–18:00
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        {!user && <ThemeToggle />}
                        <button
                            id="cart-icon-btn"
                            onClick={openCart}
                            className="relative p-1 text-black/40 dark:text-white/40 hover:text-[#f5c518] transition-colors duration-200"
                            aria-label="Кошик"
                        >
                            <HiShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#f5c518] text-[#0a0a0f] text-[10px] font-bold font-mono flex items-center justify-center leading-none shadow-[0_0_8px_rgba(245,197,24,0.5)] ring-2 ring-[#f4f4f0] dark:ring-[#0a0a0f]">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </button>
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(v => !v)}
                                    className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-200"
                                >
                                    <span className="font-display text-sm font-medium text-black/70 dark:text-white/70">
                                        {user.firstName} {user.lastName}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-[#f5c518] text-[#0a0a0f] font-display font-bold text-sm flex items-center justify-center hover:shadow-[0_0_12px_rgba(245,197,24,0.5)] transition-all duration-200">
                                        {user.firstName[0]}{user.lastName[0]}
                                    </div>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 top-11 w-56 bg-[#f4f4f0] dark:bg-[#0f0f14] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                                        style={{ animation: 'stepFadeIn 0.15s ease-out' }}
                                    >
                                        <div className="px-4 py-3 border-b border-black/5 dark:border-white/5">
                                            <p className="font-display font-semibold text-sm text-black dark:text-white">{user.firstName} {user.lastName}</p>
                                            <p className="text-xs text-black/40 dark:text-white/40 truncate">{user.email}</p>
                                        </div>
                                        <div className="p-1.5">
                                            <Link
                                                to="/orders"
                                                onClick={() => setDropdownOpen(false)}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-display tracking-wide text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors"
                                            >
                                                <HiShoppingBag className="w-3.5 h-3.5" />
                                                Замовлення
                                            </Link>
                                            <button
                                                onClick={toggleTheme}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-display tracking-wide text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors"
                                            >
                                                {isDark ? <HiSun className="w-3.5 h-3.5" /> : <HiMoon className="w-3.5 h-3.5" />}
                                                {isDark ? 'Світла тема' : 'Темна тема'}
                                            </button>
                                        </div>
                                        <div className="mx-3 h-px bg-black/5 dark:bg-white/5" />
                                        <div className="p-1.5">
                                            <button
                                                onClick={() => { handleLogout(); setDropdownOpen(false) }}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-display tracking-wide text-red-500/70 hover:bg-red-500/5 hover:text-red-500 transition-colors"
                                            >
                                                <HiArrowRightOnRectangle className="w-3.5 h-3.5" />
                                                Вийти
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => setActiveModal('login')}
                                    className="font-display text-xs font-medium tracking-wider uppercase transition-colors duration-200 px-3 py-1.5 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
                                >
                                    Увійти
                                </button>
                                <button
                                    onClick={() => setActiveModal('register')}
                                    className="font-display text-xs font-medium tracking-wider uppercase text-[#0a0a0f] bg-[#f5c518] px-3 py-1.5 rounded transition-all duration-200 hover:bg-[#f5c518]/90 hover:shadow-[0_0_16px_rgba(245,197,24,0.4)] active:scale-95"
                                >
                                    Реєстрація
                                </button>
                            </>
                        )}
                    </div>


                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label="Меню"
                    >
                        <span className={`block h-px w-6 bg-black dark:bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block h-px w-6 bg-black dark:bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-px w-6 bg-black dark:bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>


                <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
                    <div className="border-t px-6 py-4 flex flex-col gap-4 bg-white/98 dark:bg-[#0a0a0f]/98 border-black/5 dark:border-white/5">
                        <div className="h-px bg-black/5 dark:bg-white/5" />
                        {user ? (
                            <button
                                onClick={() => { handleLogout(); setMenuOpen(false) }}
                                className="text-sm text-black/60 dark:text-white/60 text-left"
                            >
                                Вийти
                            </button>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => { setActiveModal('login'); setMenuOpen(false) }}
                                    className="text-sm text-black/60 dark:text-white/60 text-left"
                                >
                                    Увійти
                                </button>
                                <button
                                    onClick={() => { setActiveModal('register'); setMenuOpen(false) }}
                                    className="text-sm font-medium text-[#f5c518] text-left"
                                >
                                    Реєстрація
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <SubNav />
            </header>

            <Modal isOpen={activeModal === 'login'} onClose={closeModal} title="Вхід" width={380}>
                <LoginForm
                    onSuccess={closeModal}
                    onSwitchToRegister={() => setActiveModal('register')}
                />
            </Modal>

            <Modal isOpen={activeModal === 'register'} onClose={closeModal} title="Реєстрація" width={380}>
                <RegisterForm
                    onSuccess={closeModal}
                    onSwitchToLogin={() => setActiveModal('login')}
                />
            </Modal>
        </>
    )
}

export default Navbar
