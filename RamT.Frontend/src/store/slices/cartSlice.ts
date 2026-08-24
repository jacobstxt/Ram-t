import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
    id: number
    quantity: number
}

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ id: number }>) => {
            const existing = state.items.find(i => i.id === action.payload.id)
            if (existing) {
                existing.quantity += 1
            } else {
                state.items.push({ id: action.payload.id, quantity: 1 })
            }
        },
        removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
            state.items = state.items.filter(i => i.id !== action.payload.id)
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(i => i.id === action.payload.id)
            if (item) item.quantity = action.payload.quantity
        },
        clearCart: (state) => {
            state.items = []
        },
    },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export const selectCartCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)

export default cartSlice.reducer
