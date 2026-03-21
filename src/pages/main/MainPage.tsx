import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/shared/constants/routes'
import { authApi } from '@/shared/api/auth.api'
import { Code, Settings } from 'lucide-react'

export default function MainPage() {
    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            await authApi.logout()
            navigate(ROUTES.LOGIN)
        } catch {
            setIsLoggingOut(false)
            navigate(ROUTES.LOGIN)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-50 px-6 py-8">
            <div className="w-full max-w-lg text-center animate-fade-up">
                <img
                    src={`${import.meta.env.BASE_URL}cse_logo.svg`}
                    alt="CSE Logo"
                    className="w-16 h-16 mx-auto mb-6"
                />
                <h1 className="text-2xl font-bold text-ink mb-1">
                    경북대학교 컴퓨터학부
                </h1>
                <h2 className="text-lg font-bold text-gradient mb-2">
                    통합인증시스템
                </h2>
                <p className="text-ink-300 text-sm mb-10">
                    환영합니다!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <button
                        onClick={() => navigate('/developer')}
                        className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all text-left group"
                    >
                        <div className="w-10 h-10 bg-surface-100 rounded-xl flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                            <Code className="w-5 h-5 text-ink-300 group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                            <p className="text-ink font-semibold text-sm">개발자 콘솔</p>
                            <p className="text-ink-300 text-xs">OAuth 앱 관리</p>
                        </div>
                    </button>
                    <button
                        onClick={() => navigate('/admin')}
                        className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all text-left group"
                    >
                        <div className="w-10 h-10 bg-surface-100 rounded-xl flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                            <Settings className="w-5 h-5 text-ink-300 group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                            <p className="text-ink font-semibold text-sm">관리자</p>
                            <p className="text-ink-300 text-xs">백오피스</p>
                        </div>
                    </button>
                </div>

                <Button onClick={handleLogout} disabled={isLoggingOut} variant="outline" className="text-ink-300">
                    {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
                </Button>
            </div>
        </div>
    )
}
