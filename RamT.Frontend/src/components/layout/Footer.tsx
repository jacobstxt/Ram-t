import { Link } from 'react-router-dom'
import { FaTelegramPlane, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import logo from '@/assets/icons/ram-logo-yellow.svg'

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0f] border-t border-white/5 mt-auto">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#f5c518]/60 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    <div className="flex flex-col gap-4 md:col-span-1">
                        <img src={logo} alt="RAM-T" className="h-20 w-auto" />
                        <p className="text-sm text-white/70 leading-relaxed">
                            Професійні рішення у сфері блискавкозахисту та заземлення.
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                            <a href="https://t.me/Iryna_Ram_T" target="_blank" rel="noopener noreferrer"
                                className="text-white/50 hover:text-[#f5c518] transition-colors text-lg">
                                <FaTelegramPlane />
                            </a>
                            <a href="https://facebook.com/ramternopil2020" target="_blank" rel="noopener noreferrer"
                                className="text-white/50 hover:text-[#f5c518] transition-colors text-lg">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com/ram.ternopil2020" target="_blank" rel="noopener noreferrer"
                                className="text-white/50 hover:text-[#f5c518] transition-colors text-lg">
                                <FaInstagram />
                            </a>
                            <a href="https://youtube.com/@ramternopil" target="_blank" rel="noopener noreferrer"
                                className="text-white/50 hover:text-[#f5c518] transition-colors text-lg">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-medium tracking-widest uppercase text-[#f5c518]/80 mb-1">
                            Навігація
                        </span>
                        <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Головна</Link>
                        <Link to="/products" className="text-sm text-white/70 hover:text-white transition-colors">Каталог</Link>
                    </div>

                    {/* Contacts */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-medium tracking-widest uppercase text-[#f5c518]/80 mb-1">
                            Контакти
                        </span>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-white/45 font-mono">Ірина (продажі)</span>
                            <a href="tel:+380970956306" className="text-sm text-white/70 hover:text-white transition-colors font-mono">
                                +38 097 095 63 06
                            </a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-white/45 font-mono">Тарас (менеджер)</span>
                            <a href="tel:+380673140785" className="text-sm text-white/70 hover:text-white transition-colors font-mono">
                                +38 067 314 07 85
                            </a>
                        </div>
                        <a href="mailto:sale@ram-t.com" className="text-sm text-white/70 hover:text-white transition-colors font-mono">
                            sale@ram-t.com
                        </a>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-medium tracking-widest uppercase text-[#f5c518]/80 mb-1">
                            Адреса
                        </span>
                        <p className="text-sm text-white/70 leading-relaxed font-mono">
                            м. Тернопіль, 46016<br />
                            вул. Текстильна 18<br />
                            офіс 22
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-white/45 font-mono tracking-wider">
                        © {new Date().getFullYear()} RAM-T. Всі права захищені.
                    </span>
                    <span className="text-xs text-white/30 font-mono">
                        БЛИСКАВКОЗАХИСТ · ЗАЗЕМЛЕННЯ
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
