import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/layouts/Layout'
import HomePage from '@/pages/home/HomePage'
import ProductsPage from '@/pages/products/ProductsPage'
import ProductViewPage from '@/pages/products/ProductViewPage.tsx'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import { useRefreshMutation } from '@/services/accountService'
import { useAppDispatch } from '@/store/store'
import { setUser, clearUser } from '@/store/slices/authSlice'

function AppInit() {
    const dispatch = useAppDispatch()
    const [refresh] = useRefreshMutation()

    useEffect(() => {
        refresh()
            .unwrap()
            .then(account => dispatch(setUser(account)))
            .catch(() => dispatch(clearUser()))
    }, [])

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductViewPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Layout>
    )
}

function App() {
    return (
        <BrowserRouter>
            <AppInit />
        </BrowserRouter>
    )
}

export default App
