import { Clock, CheckCircle, Pause } from 'lucide-react'

const tabs = [
    { label: '승인 대기', value: 'PENDING', icon: Clock },
    { label: '승인됨', value: 'APPROVED', icon: CheckCircle },
    { label: '정지됨', value: 'SUSPENDED', icon: Pause },
]

export default function AdminAppsPage() {
    return (
        <div className="animate-fade-up">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-ink">클라이언트 관리</h1>
                <p className="text-ink-300 text-sm mt-1">OAuth 클라이언트 신청을 검토하고 관리합니다.</p>
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

            <div className="space-y-3">
                <div className="bg-white rounded-2xl shadow-card p-6 text-center">
                    <p className="text-ink-300 text-sm">클라이언트 신청이 없습니다.</p>
                </div>
            </div>
        </div>
    )
}
