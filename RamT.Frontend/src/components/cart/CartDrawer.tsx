import { useAppDispatch, useAppSelector } from '@/store/store.ts'
import { removeFromCart, updateQuantity, clearCart, selectCartItems, selectCartTotal } from '@/store/slices/cartSlice.ts'
import { useCart } from '@/context/CartContext.tsx'
import { Link } from 'react-router-dom'
import { HiXMark, HiOutlineShoppingCart, HiOutlineTrash } from 'react-icons/hi2'

const APP_IMAGE_URL = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_APP_IMAGE_URL

const CartDrawer = () => {
    const { isOpen, close } = useCart()
    const dispatch = useAppDispatch()
    const items = useAppSelector(selectCartItems)
    const total = useAppSelector(selectCartTotal)

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={close}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9990,
                    background: 'rgba(0,0,0,0.45)',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transition: 'opacity 0.25s ease',
                }}
            />

            {/* Drawer */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '100%',
                    maxWidth: '420px',
                    zIndex: 9991,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s ease',
                    willChange: 'transform',
                }}
                className="bg-[#f4f4f0] dark:bg-[#0f0f14]"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-px bg-[#f5c518]" />
                        <span className="font-display font-bold text-sm tracking-[0.2em] uppercase text-black dark:text-white">
                            Кошик
                        </span>
                        {items.length > 0 && (
                            <span className="font-mono text-xs text-black/40 dark:text-white/40">
                                ({items.reduce((s, i) => s + i.quantity, 0)})
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {items.length > 0 && (
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="p-1.5 text-black/30 dark:text-white/30 hover:text-red-500 transition-colors"
                                title="Очистити кошик"
                            >
                                <HiOutlineTrash className="w-4 h-4" />
                            </button>
                        )}
                        <button
                            onClick={close}
                            className="p-1.5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
                        >
                            <HiXMark className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-20">
                            <HiOutlineShoppingCart className="w-12 h-12 text-black/15 dark:text-white/15" />
                            <p className="font-display text-sm text-black/40 dark:text-white/40 tracking-wide">
                                Кошик порожній
                            </p>
                            <Link
                                to="/products"
                                onClick={close}
                                className="font-display text-xs tracking-widest uppercase text-[#b8860b] dark:text-[#f5c518] hover:underline"
                            >
                                Перейти до каталогу →
                            </Link>
                        </div>
                    ) : (
                        items.map(item => (
                            <div
                                key={item.id}
                                className="flex gap-3 p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5"
                            >
                                {/* Image */}
                                <Link to={`/products/${item.slug}`} onClick={close} className="shrink-0">
                                    {item.image ? (
                                        <img
                                            src={`${APP_IMAGE_URL}/200_${item.image}`}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center">
                                            <HiOutlineShoppingCart className="w-5 h-5 text-black/20 dark:text-white/20" />
                                        </div>
                                    )}
                                </Link>

                                {/* Info */}
                                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                                    <Link
                                        to={`/products/${item.slug}`}
                                        onClick={close}
                                        className="font-display text-sm font-medium text-black dark:text-white leading-tight hover:text-[#b8860b] dark:hover:text-[#f5c518] transition-colors line-clamp-2"
                                    >
                                        {item.name}
                                    </Link>
                                    <span className="font-display font-bold text-sm text-[#b8860b] dark:text-[#f5c518]">
                                        {(item.price * item.quantity).toLocaleString('uk-UA')} ₴
                                    </span>

                                    {/* Quantity + remove */}
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center border border-black/10 dark:border-white/10 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => item.quantity === 1
                                                    ? dispatch(removeFromCart({ id: item.id }))
                                                    : dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                                                }
                                                className="w-7 h-7 flex items-center justify-center text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-display text-base leading-none"
                                            >
                                                −
                                            </button>
                                            <span className="w-7 text-center font-mono text-xs text-black dark:text-white">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                                className="w-7 h-7 flex items-center justify-center text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-display text-base leading-none"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => dispatch(removeFromCart({ id: item.id }))}
                                            className="text-black/25 dark:text-white/25 hover:text-red-500 transition-colors p-1"
                                        >
                                            <HiOutlineTrash className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="px-6 py-5 border-t border-black/10 dark:border-white/10 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="font-display text-xs tracking-wider uppercase text-black/50 dark:text-white/50">
                                Разом
                            </span>
                            <span className="font-display font-bold text-xl text-black dark:text-white">
                                {total.toLocaleString('uk-UA')} ₴
                            </span>
                        </div>
                        <Link
                            to="/contacts"
                            onClick={close}
                            className="flex items-center justify-center w-full py-3.5 rounded-xl bg-[#f5c518] hover:bg-[#e6b800] hover:shadow-[0_0_24px_rgba(245,197,24,0.3)] text-[#0a0a0f] font-display font-bold text-sm tracking-wider uppercase transition-all duration-200 active:scale-[0.98]"
                        >
                            Оформити замовлення
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default CartDrawer
