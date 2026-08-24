import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiXMark } from 'react-icons/hi2'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    closeOnOverlay?: boolean
    width?: number
    height?: number | 'auto'
    borderRadius?: number
    title?: string
}

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
}

const scaleIn = {
    hidden: { opacity: 0, scale: 0.97, y: -12 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' as const } },
    exit: { opacity: 0, scale: 0.98, y: -8, transition: { duration: 0.15 } },
}

const Modal = ({
    isOpen,
    onClose,
    children,
    closeOnOverlay = true,
    width = 450,
    height = 'auto',
    borderRadius = 16,
    title,
}: ModalProps) => {
    const [mounted, setMounted] = useState(isOpen)

    useEffect(() => {
        if (isOpen) setMounted(true)
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    useEffect(() => {
        if (!isOpen) return
        const scrollY = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = '100%'
        return () => {
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
            window.scrollTo(0, scrollY)
        }
    }, [isOpen])

    if (!mounted) return null

    return createPortal(
        <AnimatePresence onExitComplete={() => { if (!isOpen) setMounted(false) }}>
            {isOpen && (
                <motion.div
                    key="modal-overlay"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={closeOnOverlay ? onClose : undefined}
                >
                    <motion.div
                        key="modal-content"
                        style={{
                            maxWidth: width,
                            height: height === 'auto' ? undefined : height,
                            maxHeight: '90vh',
                            borderRadius,
                        }}
                        className="w-full mx-4 bg-[#f4f4f0] dark:bg-[#0f0f14] border border-black/10 dark:border-white/10 shadow-2xl overflow-y-auto overscroll-contain"
                        variants={scaleIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-black/5 dark:border-white/5">
                            {title && (
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-px bg-[#b8860b] dark:bg-[#f5c518]" />
                                    <span className="font-display text-xs tracking-[0.3em] uppercase text-[#b8860b] dark:text-[#f5c518]">
                                        {title}
                                    </span>
                                </div>
                            )}
                            <button
                                onClick={onClose}
                                className="ml-auto text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                            >
                                <HiXMark className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="px-6 py-6">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}

export default Modal
