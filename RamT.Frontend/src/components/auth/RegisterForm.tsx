import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'
import { useRegisterMutation } from '@/services/accountService'
import GoogleButton from './GoogleButton'
import { useAppDispatch } from '@/store/store'
import { setUser } from '@/store/slices/authSlice'

const schema = z.object({
    firstName: z.string().min(1, "Введіть ім'я"),
    lastName: z.string().min(1, 'Введіть прізвище'),
    email: z.string().email('Невірний формат email'),
    password: z.string().min(6, 'Мінімум 6 символів'),
})

type FormData = z.infer<typeof schema>

interface RegisterFormProps {
    onSuccess: () => void
    onSwitchToLogin: () => void
}

const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
    const dispatch = useAppDispatch()
    const [register, { isLoading, error }] = useRegisterMutation()
    const [showPassword, setShowPassword] = useState(false)

    const { register: field, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })


    const onSubmit = async (data: FormData) => {
        try {
            const account = await register(data).unwrap()
            dispatch(setUser(account))
            onSuccess()
        } catch {}
    }

    const inputClass = 'w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-[#f5c518]/60 transition-colors'
    const labelClass = 'font-display text-xs tracking-wider uppercase text-black/50 dark:text-white/50 block mb-2'
    const errorClass = 'text-xs text-red-500 dark:text-red-400 mt-1'

return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 step-animate">
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className={labelClass}>Ім'я</label>
                    <input {...field('firstName')} type="text" placeholder="Іван" className={inputClass} />
                    {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                </div>
                <div>
                    <label className={labelClass}>Прізвище</label>
                    <input {...field('lastName')} type="text" placeholder="Петренко" className={inputClass} />
                    {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                </div>
            </div>

            <div>
                <label className={labelClass}>Email</label>
                <input {...field('email')} type="email" placeholder="your@email.com" className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            <div>
                <label className={labelClass}>Пароль</label>
                <div className="relative">
                    <input
                        {...field('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className={`${inputClass} pr-11`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors"
                    >
                        {showPassword ? <HiEyeSlash className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.password && <p className={errorClass}>{errors.password.message}</p>}
            </div>

            {error && (
                <p className={errorClass}>
                    {(error as { data?: { detail?: string } })?.data?.detail ?? 'Помилка реєстрації'}
                </p>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#f5c518] hover:bg-[#e6b800] text-[#0a0a0f] font-display font-bold text-sm tracking-wider uppercase transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
            >
                {isLoading ? 'Реєстрація...' : 'Зареєструватись'}
            </button>

            <GoogleButton onSuccess={onSuccess} label="Зареєструватись через Google" />

            <p className="text-center text-xs text-black/40 dark:text-white/40">
                Вже є акаунт?{' '}
                <button type="button" onClick={onSwitchToLogin} className="text-[#b8860b] dark:text-[#f5c518] hover:underline font-medium">
                    Увійти
                </button>
            </p>
        </form>
    )
}

export default RegisterForm
