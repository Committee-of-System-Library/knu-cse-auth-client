import { AppWindow, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function DeveloperAppsPage() {
    const navigate = useNavigate()

    return (
        <div className="animate-fade-up">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-ink">내 애플리케이션</h1>
                <p className="text-ink-300 text-sm mt-1">등록한 OAuth 클라이언트를 관리합니다.</p>
            </div>

            {/* 빈 상태 */}
            <div className="bg-white rounded-2xl shadow-card p-12 text-center">
                <div className="w-16 h-16 bg-surface-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AppWindow className="w-7 h-7 text-ink-200" />
                </div>
                <h3 className="text-ink font-semibold text-base mb-2">
                    등록된 애플리케이션이 없습니다
                </h3>
                <p className="text-ink-300 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                    SSO 로그인을 프로젝트에 연동하려면 애플리케이션을 등록하세요.
                    관리자 승인 후 client_id와 secret을 발급받을 수 있습니다.
                </p>
                <button
                    onClick={() => navigate('/developer/apps/new')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    첫 번째 앱 등록하기
                </button>
            </div>
        </div>
    )
}
