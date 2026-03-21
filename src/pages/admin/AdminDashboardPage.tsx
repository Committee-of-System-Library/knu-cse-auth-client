import { Users, ShieldCheck, Database, AppWindow } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const stats = [
    { label: '전체 사용자', value: '—', icon: Users, color: 'bg-primary-50 text-primary' },
    { label: '인증 대기', value: '—', icon: ShieldCheck, color: 'bg-amber-50 text-amber-600' },
    { label: '학생 명단', value: '—', icon: Database, color: 'bg-emerald-50 text-emerald-600' },
    { label: '클라이언트', value: '—', icon: AppWindow, color: 'bg-sky-50 text-sky-600' },
]

const quickActions = [
    { title: '사용자 관리', desc: '역할 변경, 계정 관리', to: '/admin/users', icon: Users },
    { title: '인증 요청 처리', desc: '학부생 인증 승인/거부', to: '/admin/verifications', icon: ShieldCheck },
    { title: '학생 명단', desc: 'CSV 업로드, 명단 관리', to: '/admin/registry', icon: Database },
    { title: '클라이언트 관리', desc: 'OAuth 앱 승인/거부', to: '/admin/apps', icon: AppWindow },
]

export default function AdminDashboardPage() {
    const navigate = useNavigate()

    return (
        <div className="animate-fade-up">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-ink">관리자 대시보드</h1>
                <p className="text-ink-300 text-sm mt-1">SSO 서비스 현황을 한눈에 확인하세요.</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <p className="text-2xl font-bold text-ink">{stat.value}</p>
                        <p className="text-ink-300 text-xs mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* 빠른 작업 */}
            <h2 className="text-lg font-bold text-ink mb-4">빠른 작업</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action) => (
                    <button
                        key={action.to}
                        onClick={() => navigate(action.to)}
                        className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover text-left transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 bg-surface-100 rounded-xl flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                                <action.icon className="w-5 h-5 text-ink-300 group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <p className="text-ink font-semibold text-sm">{action.title}</p>
                                <p className="text-ink-300 text-xs mt-0.5">{action.desc}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
