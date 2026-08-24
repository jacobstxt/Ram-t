interface PaginationProps {
    page: number
    totalPages: number
    totalCount: number
    onPageChange: (page: number) => void
}

const Pagination = ({ page, totalPages, totalCount, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null

    const btnBase = 'font-display text-sm rounded-lg border transition-all'
    const btnDefault = 'border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:border-[#f5c518] hover:text-[#b8860b] dark:hover:text-[#f5c518]'
    const btnActive = 'bg-[#f5c518] text-[#0a0a0f] border-[#f5c518] font-semibold'

    return (
        <div className="mt-10">
            <div className="flex items-center justify-center gap-2">
                <button
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className={`${btnBase} ${btnDefault} px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                    ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={`${btnBase} w-9 h-9 ${p === page ? btnActive : btnDefault}`}
                    >
                        {p}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className={`${btnBase} ${btnDefault} px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                    →
                </button>
            </div>

            <p className="text-center text-xs text-black/30 dark:text-white/30 font-mono mt-4">
                {totalCount} товарів · сторінка {page} з {totalPages}
            </p>
        </div>
    )
}

export default Pagination
