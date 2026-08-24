import { FaTelegramPlane, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { HiPhone, HiEnvelope, HiMapPin, HiClock, HiTruck } from 'react-icons/hi2'

const ContactsPage = () => {
    return (
        <div className="min-h-screen bg-[#f4f4f0] dark:bg-[#0a0a0f]">

            {/* Hero */}
            <div className="border-b border-black/8 dark:border-white/8">
                <div className="max-w-7xl mx-auto px-6 py-14">
                    <p className="font-display text-xs tracking-[0.3em] uppercase text-[#f5c518] mb-3">RAM-T</p>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-black dark:text-white">
                        Контакти
                    </h1>
                    <p className="mt-3 text-black/50 dark:text-white/50 text-sm max-w-md">
                        Зв'яжіться з нами зручним для вас способом — відповімо швидко.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left column — contacts */}
                    <div className="flex flex-col gap-5">

                        {/* Phones */}
                        <section className="bg-white dark:bg-white/4 border border-black/8 dark:border-white/8 rounded-2xl p-6">
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="w-8 h-8 rounded-xl bg-[#f5c518]/15 flex items-center justify-center">
                                    <HiPhone className="w-4 h-4 text-[#f5c518]" />
                                </div>
                                <h2 className="font-display text-xs tracking-widest uppercase text-black/40 dark:text-white/40">Телефони</h2>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div>
                                    <p className="text-[10px] font-display tracking-widest uppercase text-black/35 dark:text-white/35 mb-1">Відділ продажу</p>
                                    <a href="tel:+380970956306" className="font-mono text-xl font-semibold text-black dark:text-white hover:text-[#f5c518] transition-colors">
                                        +38 097 095 63 06
                                    </a>
                                    <p className="text-sm text-black/45 dark:text-white/45 mt-0.5">— Ірина</p>
                                </div>
                                <div className="h-px bg-black/6 dark:bg-white/6" />
                                <div>
                                    <p className="text-[10px] font-display tracking-widest uppercase text-black/35 dark:text-white/35 mb-1">Керівник</p>
                                    <a href="tel:+380673140785" className="font-mono text-xl font-semibold text-black dark:text-white hover:text-[#f5c518] transition-colors">
                                        +38 067 314 07 85
                                    </a>
                                    <p className="text-sm text-black/45 dark:text-white/45 mt-0.5">— Тарас</p>
                                </div>
                            </div>
                        </section>

                        {/* Email */}
                        <section className="bg-white dark:bg-white/4 border border-black/8 dark:border-white/8 rounded-2xl p-6">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-[#f5c518]/15 flex items-center justify-center">
                                    <HiEnvelope className="w-4 h-4 text-[#f5c518]" />
                                </div>
                                <h2 className="font-display text-xs tracking-widest uppercase text-black/40 dark:text-white/40">Email</h2>
                            </div>
                            <a href="mailto:sale@ram-t.com" className="font-mono text-lg font-medium text-black dark:text-white hover:text-[#f5c518] transition-colors">
                                sale@ram-t.com
                            </a>
                        </section>

                        {/* Address */}
                        <section className="bg-white dark:bg-white/4 border border-black/8 dark:border-white/8 rounded-2xl p-6">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-[#f5c518]/15 flex items-center justify-center">
                                    <HiMapPin className="w-4 h-4 text-[#f5c518]" />
                                </div>
                                <h2 className="font-display text-xs tracking-widest uppercase text-black/40 dark:text-white/40">Адреса офісу</h2>
                            </div>
                            <p className="font-mono text-sm text-black/80 dark:text-white/80 leading-relaxed">
                                Україна, м. Тернопіль, 46016<br />
                                завод «Текстерно», вул. Текстильна 18, оф. 22
                            </p>
                            <a
                                href="https://www.google.com/maps/place/РАМ-Т/@49.5676199,25.6150375,17z"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 mt-4 text-xs font-display tracking-wide text-[#f5c518] hover:underline"
                            >
                                <HiMapPin className="w-3.5 h-3.5" />
                                Показати на карті
                            </a>
                        </section>

                        <div className="grid grid-cols-2 gap-5">
                            {/* Working hours */}
                            <section className="bg-white dark:bg-white/4 border border-black/8 dark:border-white/8 rounded-2xl p-6">
                                <div className="flex items-center gap-2.5 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-[#f5c518]/15 flex items-center justify-center">
                                        <HiClock className="w-4 h-4 text-[#f5c518]" />
                                    </div>
                                    <h2 className="font-display text-xs tracking-widest uppercase text-black/40 dark:text-white/40">Графік</h2>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <p className="font-mono text-sm font-medium text-black dark:text-white">пн–пт</p>
                                        <p className="font-mono text-sm text-[#f5c518]">09:00–18:00</p>
                                    </div>
                                    <div>
                                        <p className="font-mono text-sm font-medium text-black dark:text-white">сб–нд</p>
                                        <p className="font-mono text-sm text-black/40 dark:text-white/40">вихідний</p>
                                    </div>
                                </div>
                            </section>

                            {/* Pickup */}
                            <section className="bg-white dark:bg-white/4 border border-black/8 dark:border-white/8 rounded-2xl p-6">
                                <div className="flex items-center gap-2.5 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-[#f5c518]/15 flex items-center justify-center">
                                        <HiTruck className="w-4 h-4 text-[#f5c518]" />
                                    </div>
                                    <h2 className="font-display text-xs tracking-widest uppercase text-black/40 dark:text-white/40">Самовивіз</h2>
                                </div>
                                <p className="font-mono text-sm text-black/80 dark:text-white/80 leading-relaxed">
                                    ТОВ «РАМ-Т»<br />
                                    завод «Текстерно»<br />вул. Текстильна 18
                                </p>
                            </section>
                        </div>

                        {/* Social */}
                        <section className="bg-white dark:bg-white/4 border border-black/8 dark:border-white/8 rounded-2xl p-6">
                            <h2 className="font-display text-xs tracking-widest uppercase text-black/40 dark:text-white/40 mb-4">Ми в соцмережах</h2>
                            <div className="flex items-center gap-3">
                                {[
                                    { icon: <FaTelegramPlane className="w-4 h-4" />, href: 'https://t.me/Iryna_Ram_T', label: 'Telegram' },
                                    { icon: <FaFacebookF className="w-4 h-4" />, href: 'https://facebook.com/ramternopil2020', label: 'Facebook' },
                                    { icon: <FaInstagram className="w-4 h-4" />, href: 'https://instagram.com/ram_ternopil', label: 'Instagram' },
                                    { icon: <FaYoutube className="w-4 h-4" />, href: 'https://youtube.com/@ramternopil', label: 'YouTube' },
                                ].map(({ icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-10 h-10 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center text-black/40 dark:text-white/40 hover:border-[#f5c518] hover:text-[#f5c518] transition-all duration-200"
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </section>
                    </div>


                    <div className="lg:sticky lg:top-28 h-fit">
                        <div className="rounded-2xl overflow-hidden border border-black/8 dark:border-white/8 shadow-sm">
                            <iframe
                                title="Офіс RAM-T на карті"
                                src="https://maps.google.com/maps?q=49.5676199,25.6150375&z=17&ie=UTF8&iwloc=&output=embed"
                                className="w-full h-[480px] lg:h-[600px]"
                                style={{ border: 0 }}
                                loading="lazy"
                            />
                            <div className="px-5 py-4 bg-white dark:bg-white/4 border-t border-black/8 dark:border-white/8 flex items-center justify-between">
                                <div>
                                    <p className="font-display text-xs font-semibold text-black dark:text-white">ТОВ «РАМ-Т»</p>
                                    <p className="font-mono text-xs text-black/45 dark:text-white/45 mt-0.5">вул. Текстильна 18, Тернопіль</p>
                                </div>
                                <a
                                    href="https://www.google.com/maps/place/РАМ-Т/@49.5676199,25.6150375,17z"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-display tracking-wide text-[#f5c518] hover:underline shrink-0"
                                >
                                    Відкрити карту ↗
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactsPage
