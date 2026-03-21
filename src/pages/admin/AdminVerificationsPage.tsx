import { Clock, CheckCircle, XCircle } from 'lucide-react'

const tabs = [
    { label: '대기 중', value: 'PENDING', icon: Clock },
    { label: '승인됨', value: 'APPROVED', icon: CheckCircle },
    { label: '거부됨', value: 'REJECTED', icon: XCircle },
]

export default function AdminVerificationsPage() {
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
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white shadow-card text-ink-500 hover:text-primary hover:bg-primary-50 transition-all"
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 리스트 */}
            <div className="space-y-3">
                <div className="bg-white rounded-2xl shadow-card p-6 text-center">
                    <p className="text-ink-300 text-sm">인증 요청이 없습니다.</p>
                </div>
            </div>
        </div>
    )
}
