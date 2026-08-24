import { Link } from 'react-router-dom'

const services = [
    { num: '01', title: 'Проектування систем', desc: 'Розробка проектної документації для систем блискавкозахисту та заземлення відповідно до норм.' },
    { num: '02', title: 'Монтаж та встановлення', desc: 'Власна бригада монтажників з досвідом встановлення систем будь-якої складності.' },
    { num: '03', title: 'Технічна документація', desc: 'Підготовка повного пакету технічної документації та актів виконаних робіт.' },
    { num: '04', title: 'Електровимірювання', desc: 'Вимірювання опору заземлення, перевірка ізоляції, складання протоколів.' },
    { num: '05', title: 'Снігозатримання', desc: 'Монтаж систем снігозатримання для захисту покрівлі та людей.' },
    { num: '06', title: 'Продаж обладнання', desc: 'Постачання сертифікованих комплектуючих для систем блискавкозахисту.' },
]

const advantages = [
    { num: '01', title: 'Офіційна гарантія', desc: 'Надаємо гарантію на всі виконані роботи та встановлене обладнання.' },
    { num: '02', title: 'Власна бригада', desc: 'Штатні монтажники без субпідрядників — повний контроль якості.' },
    { num: '03', title: 'Точне проектування', desc: 'Розрахунки за актуальними нормами ДСТУ та міжнародними стандартами.' },
    { num: '04', title: 'Складські запаси', desc: 'Власний склад комплектуючих — мінімальні терміни реалізації проектів.' },
]

const HomePage = () => {
    return (
        <div className="bg-[#f4f4f0] dark:bg-[#0a0a0f] text-black dark:text-white transition-colors duration-300">

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

                {/* background grid */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* diagonal yellow accent */}
                <div className="absolute top-0 right-0 w-[55%] h-full bg-[#f5c518]/5 dark:bg-[#f5c518]/[0.04] [clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)]" />

                {/* large background text */}
                <span className="absolute right-0 bottom-8 font-display font-bold text-[clamp(80px,15vw,200px)] leading-none text-black/[0.04] dark:text-white/[0.03] select-none pointer-events-none pr-4 tracking-tight">
                    RAM-T
                </span>

                <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
                    <div className="max-w-3xl">

                        {/* label */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-px bg-[#b8860b] dark:bg-[#f5c518]" />
                            <span className="font-display text-xs font-medium tracking-[0.3em] uppercase text-[#b8860b] dark:text-[#f5c518]">
                                Тернопіль · з 2020 року
                            </span>
                        </div>

                        {/* heading */}
                        <h1 className="font-display font-bold leading-[0.9] tracking-tight mb-8">
                            <span className="block text-[clamp(52px,8vw,110px)] text-black dark:text-white">
                                Блискавко-
                            </span>
                            <span className="block text-[clamp(52px,8vw,110px)] text-[#f5c518]">
                                захист
                            </span>
                            <span className="block text-[clamp(52px,8vw,110px)] text-black dark:text-white">
                                та заземлення
                            </span>
                        </h1>

                        <p className="text-base text-black/60 dark:text-white/50 max-w-lg leading-relaxed mb-10 font-sans">
                            Проектування, монтаж і обслуговування систем захисту від блискавки.
                            Власна бригада, офіційна гарантія, сертифіковане обладнання.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/products"
                                className="font-display text-sm font-semibold tracking-wider uppercase bg-[#f5c518] text-[#0a0a0f] px-8 py-4 hover:bg-[#f5c518]/90 hover:shadow-[0_0_32px_rgba(245,197,24,0.3)] transition-all duration-200 active:scale-95"
                            >
                                Переглянути каталог
                            </Link>
                            <a
                                href="tel:+380970956306"
                                className="font-display text-sm font-semibold tracking-wider uppercase border border-black/20 dark:border-white/20 text-black dark:text-white px-8 py-4 hover:border-[#f5c518] hover:text-[#f5c518] transition-all duration-200"
                            >
                                Зателефонувати
                            </a>
                        </div>
                    </div>
                </div>

                {/* bottom stats bar */}
                <div className="relative border-t border-black/10 dark:border-white/10">
                    <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: '5+', label: 'Років досвіду' },
                            { value: '500+', label: 'Об\'єктів' },
                            { value: '100%', label: 'Гарантія' },
                            { value: '2', label: 'Досвідчені менеджери' },
                        ].map(stat => (
                            <div key={stat.label} className="flex flex-col gap-1">
                                <span className="font-display font-bold text-3xl text-[#f5c518]">{stat.value}</span>
                                <span className="text-xs text-black/50 dark:text-white/50 font-mono uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ПОСЛУГИ ──────────────────────────────────────────── */}
            <section className="py-24 border-t border-black/10 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex items-end justify-between mb-16 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-px bg-[#b8860b] dark:bg-[#f5c518]" />
                                <span className="font-display text-xs tracking-[0.3em] uppercase text-[#b8860b] dark:text-[#f5c518]">Що ми робимо</span>
                            </div>
                            <h2 className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-tight text-black dark:text-white">
                                Наші послуги
                            </h2>
                        </div>
                        <Link to="/products" className="hidden md:flex font-display text-xs tracking-widest uppercase text-black/40 dark:text-white/40 hover:text-[#f5c518] transition-colors items-center gap-2 shrink-0">
                            Каталог →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {services.map(s => (
                            <div
                                key={s.num}
                                className="group bg-black/5 dark:bg-white/5 rounded-xl p-8 hover:bg-[#f5c518]/5 transition-colors duration-300 cursor-default"
                            >
                                <span className="font-display font-bold text-5xl text-black/10 dark:text-white/10 group-hover:text-[#f5c518]/20 transition-colors duration-300 block mb-6">
                                    {s.num}
                                </span>
                                <h3 className="font-display font-semibold text-xl text-black dark:text-white mb-3 group-hover:text-[#f5c518] transition-colors duration-300">
                                    {s.title}
                                </h3>
                                <p className="text-sm text-black/55 dark:text-white/50 leading-relaxed">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ПЕРЕВАГИ ─────────────────────────────────────────── */}
            <section className="py-24 bg-black/[0.03] dark:bg-white/[0.02] border-t border-black/10 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-px bg-[#b8860b] dark:bg-[#f5c518]" />
                            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#b8860b] dark:text-[#f5c518]">Чому обирають нас</span>
                        </div>
                        <h2 className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-tight text-black dark:text-white">
                            Наші переваги
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {advantages.map(a => (
                            <div key={a.num} className="flex gap-8 items-start group bg-black/5 dark:bg-white/5 rounded-xl p-8 hover:bg-[#f5c518]/5 transition-colors duration-300">
                                <span className="font-display font-bold text-6xl leading-none text-black/10 dark:text-white/10 group-hover:text-[#f5c518]/30 transition-colors duration-300 shrink-0 w-16">
                                    {a.num}
                                </span>
                                <div className="pt-2 border-t-2 border-black/10 dark:border-white/10 group-hover:border-[#f5c518]/50 transition-colors duration-300 flex-1">
                                    <h3 className="font-display font-semibold text-xl text-black dark:text-white mb-2">
                                        {a.title}
                                    </h3>
                                    <p className="text-sm text-black/55 dark:text-white/50 leading-relaxed">
                                        {a.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────── */}
            <section className="py-24 border-t border-black/10 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="relative overflow-hidden bg-[#f5c518] rounded-xl p-12 md:p-16">

                        {/* background symbol */}
                        <span className="absolute right-8 bottom-0 font-display font-bold text-[clamp(100px,20vw,260px)] leading-none text-black/10 select-none pointer-events-none translate-y-6">
                            ⚡
                        </span>

                        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Left — заголовок */}
                            <div>
                                <h2 className="font-display font-bold text-[clamp(32px,5vw,56px)] leading-tight text-[#0a0a0f] mb-4">
                                    Потрібен прорахунок об'єкта?
                                </h2>
                                <p className="text-sm text-black/60 leading-relaxed">
                                    Залиште заявку, і наші інженери підготують комерційну пропозицію з урахуванням специфіки вашого об'єкту. Це безкоштовно.
                                </p>
                            </div>

                            {/* Right — контакти */}
                            <div className="flex flex-col gap-6">
                                <span className="font-display text-xs font-medium tracking-[0.3em] uppercase text-black/50">
                                    Відділ продажу
                                </span>

                                <div className="flex flex-col gap-4">
                                    <div>
                                        <a href="tel:+380970956306" className="font-display font-semibold text-lg text-[#0a0a0f] hover:underline transition-all">
                                            +38 097 095 63 06
                                        </a>
                                        <p className="text-xs text-black/50 mt-0.5">— Ірина, керівник</p>
                                    </div>
                                    <div>
                                        <a href="tel:+380673140785" className="font-display font-semibold text-lg text-[#0a0a0f] hover:underline transition-all">
                                            +38 067 314 07 85
                                        </a>
                                        <p className="text-xs text-black/50 mt-0.5">— Тарас</p>
                                    </div>
                                </div>

                                <div className="h-px bg-black/15" />

                                <div className="flex flex-col gap-3">
                                    <div>
                                        <span className="text-xs text-black/50 font-mono uppercase tracking-wider">Електронна пошта</span>
                                        <a href="mailto:sale@ram-t.com" className="block font-display font-semibold text-[#0a0a0f] hover:underline mt-0.5">
                                            sale@ram-t.com
                                        </a>
                                    </div>
                                    <div>
                                        <span className="text-xs text-black/50 font-mono uppercase tracking-wider">Головний офіс</span>
                                        <p className="font-mono text-sm text-black/70 mt-0.5 leading-relaxed">
                                            Україна, м. Тернопіль, 46016<br />
                                            вул. Текстильна 18, оф. 22
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default HomePage
