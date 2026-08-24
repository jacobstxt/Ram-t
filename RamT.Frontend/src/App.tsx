import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/layouts/Layout'
import HomePage from '@/pages/home/HomePage'
import ProductsPage from '@/pages/products/ProductsPage'
import ProductPage from '@/pages/products/ProductPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:slug" element={<ProductPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
