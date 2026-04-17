import { useState } from 'react'
import { Trash2, Loader2, X, AlertTriangle } from 'lucide-react'
import { snackApi, type SnackEvent } from '@/shared/api/snack.api'

type Props = {
    event: SnackEvent
    onDeleted: () => void
    /** "icon" = small trash icon (for cards). "button" = full-width destructive button (for detail page) */
    variant?: 'icon' | 'button'
}

export default function DeleteEventButton({ event, onDeleted, variant = 'icon' }: Props) {
    const [confirming, setConfirming] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const isOpen = event.status === 'OPEN'
    const hasHandouts = event.handoutCount > 0

    const handleDelete = async () => {
        setDeleting(true)
        setError(null)
        try {
            await snackApi.delete(event.id)
            onDeleted()
        } catch (err) {
            setError(err instanceof Error ? err.message : '삭제에 실패했습니다.')
            setDeleting(false)
        }
    }

    const trigger =
        variant === 'icon' ? (
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setConfirming(true)
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-300 transition-colors hover:bg-rose-50 hover:text-rose-600"
                aria-label="이벤트 삭제"
                title="이벤트 삭제"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        ) : (
            <button
                onClick={() => setConfirming(true)}
                className="flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
            >
                <Trash2 className="h-4 w-4" />
                이벤트 삭제
            </button>
        )

    return (
        <>
            {trigger}

            {confirming && (
                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4"
                    onClick={() => !deleting && setConfirming(false)}
                >
                    <div
                        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50">
                                <AlertTriangle className="h-5 w-5 text-rose-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-base font-bold text-ink">
                                    이벤트를 삭제할까요?
                                </h3>
                                <p className="mt-0.5 truncate text-xs text-ink-500">
                                    {event.name}
                                </p>
                            </div>
                            <button
                                onClick={() => setConfirming(false)}
                                disabled={deleting}
                                className="rounded-lg p-1 text-ink-300 hover:bg-surface-100"
                                aria-label="닫기"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {isOpen && (
                            <div className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                                ⚠ 진행 중인 이벤트입니다
                            </div>
                        )}

                        {hasHandouts && (
                            <div className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                                <strong>{event.handoutCount}명의 배부 기록</strong>이 함께 삭제됩니다.
                                되돌릴 수 없습니다.
                            </div>
                        )}

                        {!hasHandouts && !isOpen && (
                            <p className="mb-3 text-sm text-ink-500">
                                삭제 후 복구할 수 없습니다.
                            </p>
                        )}

                        {error && (
                            <p className="mb-3 text-xs text-rose-600">{error}</p>
                        )}

                        <div className="flex gap-2">
                            <button
                                onClick={() => setConfirming(false)}
                                disabled={deleting}
                                className="flex-1 rounded-xl bg-surface-100 py-2.5 text-sm font-medium text-ink-500 hover:bg-surface-200 disabled:opacity-50"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-500 py-2.5 text-sm font-medium text-white hover:bg-rose-600 disabled:opacity-50"
                            >
                                {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
