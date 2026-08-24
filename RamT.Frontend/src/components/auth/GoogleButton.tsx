import { useRef } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useGoogleAuthMutation } from '@/services/accountService'
import { useAppDispatch } from '@/store/store'
import { setUser } from '@/store/slices/authSlice'
import GoogleIcon from '@/components/ui/GoogleIcon'

interface GoogleButtonProps {
    onSuccess: () => void
    label?: string
}

const GoogleButton = ({ onSuccess, label = 'Увійти через Google' }: GoogleButtonProps) => {
    const dispatch = useAppDispatch()
    const [googleAuth, { isLoading }] = useGoogleAuthMutation()
    const containerRef = useRef<HTMLDivElement>(null)

    const handleCustomClick = () => {
        const btn = containerRef.current?.querySelector('div[role="button"], iframe')
        if (btn instanceof HTMLElement) btn.click()
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
                <span className="text-xs text-black/30 dark:text-white/30 font-display">або</span>
                <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
            </div>

            <div className="relative w-full">
                <button
                    type="button"
                    onClick={handleCustomClick}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 text-sm font-medium text-black/80 dark:text-white/80 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <svg className="w-4 h-4 animate-spin text-black/40 dark:text-white/40" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                    ) : (
                        <GoogleIcon className="w-4 h-4 shrink-0" />
                    )}
                    {label}
                </button>

                <div
                    ref={containerRef}
                    className="absolute inset-0 opacity-0 pointer-events-none overflow-hidden"
                    aria-hidden="true"
                >
                    <GoogleLogin
                        text={label === 'Увійти через Google' ? 'signin_with' : 'signup_with'}
                        shape="rectangular"
                        theme="outline"
                        size="large"
                        width="400"
                        onSuccess={async (response) => {
                            if (!response.credential) return
                            try {
                                const account = await googleAuth({ idToken: response.credential }).unwrap()
                                dispatch(setUser(account))
                                onSuccess()
                            } catch {}
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default GoogleButton
