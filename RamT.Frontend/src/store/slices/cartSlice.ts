import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
    id: number
    name: string
    price: number
    image: string | null
    slug: string
    quantity: number
}

interface CartState {
    items: CartItem[]
}

const STORAGE_KEY = 'ramt_cart'

const loadFromStorage = (): CartItem[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

const saveToStorage = (items: CartItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const initialState: CartState = {
    items: loadFromStorage(),
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(i => i.id === action.payload.id)
            if (existing) {
                existing.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
            saveToStorage(state.items)
        },
        removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
            state.items = state.items.filter(i => i.id !== action.payload.id)
            saveToStorage(state.items)
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(i => i.id === action.payload.id)
            if (item) {
                item.quantity = Math.max(1, action.payload.quantity)
                saveToStorage(state.items)
            }
        },
        clearCart: (state) => {
            state.items = []
            localStorage.removeItem(STORAGE_KEY)
        },
    },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

export const selectCartCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)

export const selectCartTotal = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

export const selectCartItems = (state: { cart: CartState }) => state.cart.items

export default cartSlice.reducer
