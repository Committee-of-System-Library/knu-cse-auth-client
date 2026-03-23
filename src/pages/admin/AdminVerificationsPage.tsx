import { useEffect, useState, useCallback } from 'react'
import { Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { authApi, type VerificationRequest } from '@/shared/api/auth.api'

const tabs = [
    { label: '대기 중', value: 'PENDING', icon: Clock },
    { label: '승인됨', value: 'APPROVED', icon: CheckCircle },
    { label: '거부됨', value: 'REJECTED', icon: XCircle },
] as const

const STATUS_COLORS: Record<string, string> = {
    PENDING: 'bg-yellow-50 text-yellow-700',
    APPROVED: 'bg-green-50 text-green-700',
    REJECTED: 'bg-red-50 text-red-700',
}

export default function AdminVerificationsPage() {
    const [activeTab, setActiveTab] = useState<string>('PENDING')
    const [items, setItems] = useState<VerificationRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState<number | null>(null)

    const load = useCallback((status: string) => {
        setLoading(true)
        authApi.adminVerifications.list(status)
            .then(setItems)
            .catch(() => alert('인증 요청을 불러올 수 없습니다.'))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => { load(activeTab) }, [activeTab, load])

    const handleApprove = async (item: VerificationRequest) => {
        const comment = prompt('승인 코멘트 (선택사항):')
        if (comment === null) return
        setActionLoading(item.id)
        try {
            await authApi.adminVerifications.approve(item.id, comment || undefined)
            setItems(prev => prev.filter(v => v.id !== item.id))
        } catch { alert('승인에 실패했습니다.') }
        setActionLoading(null)
    }

    const handleReject = async (item: VerificationRequest) => {
        const comment = prompt('거절 사유:')
        if (comment === null) return
        setActionLoading(item.id)
        try {
            await authApi.adminVerifications.reject(item.id, comment || undefined)
            setItems(prev => prev.filter(v => v.id !== item.id))
        } catch { alert('거절에 실패했습니다.') }
        setActionLoading(null)
    }

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr)
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }

    return (
        <div className="animate-fade-up">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-ink">학부생 인증 요청</h1>
                <p className="text-ink-300 text-sm mt-1">학부생 인증 요청을 검토하고 승인/거부합니다.</p>
            </div>

            {/* 탭 */}
            <div className="flex gap-2 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            activeTab === tab.value
                                ? 'bg-primary text-white shadow-card'
                                : 'bg-white shadow-card text-ink-500 hover:text-primary hover:bg-primary-50'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 리스트 */}
            <div className="space-y-3">
                {loading ? (
                    <div className="bg-white rounded-2xl shadow-card p-6 text-center">
                        <Loader2 className="w-5 h-5 animate-spin text-ink-200 mx-auto" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-card p-6 text-center">
                        <p className="text-ink-300 text-sm">인증 요청이 없습니다.</p>
                    </div>
                ) : items.map(item => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-card p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-semibold text-ink font-mono">{item.requestedStudentNumber}</span>
                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[item.status]}`}>
                                        {item.status}
                                    </span>
                                </div>
                                <p className="text-sm text-ink-500 mb-2">{item.evidenceDescription}</p>
                                <p className="text-xs text-ink-300">신청일: {formatDate(item.createdAt)}</p>
                                {item.reviewComment && (
                                    <p className="text-xs text-ink-400 mt-1">코멘트: {item.reviewComment}</p>
                                )}
                            </div>

                            {activeTab === 'PENDING' && (
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={() => handleApprove(item)}
                                        disabled={actionLoading === item.id}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
                                    >
                                        {actionLoading === item.id ? (
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        ) : (
                                            <CheckCircle className="w-3.5 h-3.5" />
                                        )}
                                        승인
                                    </button>
                                    <button
                                        onClick={() => handleReject(item)}
                                        disabled={actionLoading === item.id}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                                    >
                                        <XCircle className="w-3.5 h-3.5" />
                                        거절
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
