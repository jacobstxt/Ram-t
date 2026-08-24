import type { ReactNode } from 'react'
import Navbar from '@/components/layout/Navbar.tsx'
import Footer from '@/components/layout/Footer.tsx'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
