import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'
import { useLoginMutation } from '@/services/accountService'
import { useAppDispatch } from '@/store/store'
import { setUser } from '@/store/slices/authSlice'

const schema = z.object({
    email: z.string().email('Невірний формат email'),
    password: z.string().min(1, 'Введіть пароль'),
})

type FormData = z.infer<typeof schema>

interface LoginFormProps {
    onSuccess: () => void
    onSwitchToRegister: () => void
}

const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
    const dispatch = useAppDispatch()
    const [login, { isLoading, error }] = useLoginMutation()
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: FormData) => {
        try {
            const account = await login(data).unwrap()
            dispatch(setUser(account))
            onSuccess()
        } catch {}
    }

    const inputClass = 'w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-[#f5c518]/60 transition-colors'
    const labelClass = 'font-display text-xs tracking-wider uppercase text-black/50 dark:text-white/50 block mb-2'
    const errorClass = 'text-xs text-red-500 dark:text-red-400 mt-1'

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 step-animate">
            <div>
                <label className={labelClass}>Email</label>
                <input
                    {...register('email')}
                    type="email"
                    placeholder="your@email.com"
                    className={inputClass}
                />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            <div>
                <label className={labelClass}>Пароль</label>
                <div className="relative">
                    <input
                        {...register('password')}
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

            {error && <p className={errorClass}>Невірний email або пароль</p>}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#f5c518] hover:bg-[#e6b800] text-[#0a0a0f] font-display font-bold text-sm tracking-wider uppercase transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
                {isLoading ? 'Вхід...' : 'Увійти'}
            </button>

            <p className="text-center text-xs text-black/40 dark:text-white/40">
                Немає акаунту?{' '}
                <button type="button" onClick={onSwitchToRegister} className="text-[#b8860b] dark:text-[#f5c518] hover:underline font-medium">
                    Зареєструватись
                </button>
            </p>
        </form>
    )
}

export default LoginForm
