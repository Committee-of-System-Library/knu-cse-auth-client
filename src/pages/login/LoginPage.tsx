import { useSearchParams } from 'react-router-dom'
import LoginIntroSection from './components/LoginIntroSection'
import LoginCardSection from './components/LoginCardSection'

export default function LoginPage() {
    const [searchParams] = useSearchParams()
    const hasRequiredParams =
        searchParams.has('client_id') &&
        searchParams.has('redirect_uri') &&
        searchParams.has('state')

    if (!hasRequiredParams) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-50 px-6">
                <div className="text-center">
                    <p className="text-5xl font-bold text-ink-200 mb-4">400</p>
                    <h1 className="text-xl font-bold text-ink mb-2">잘못된 접근입니다</h1>
                    <p className="text-ink-300 text-sm mb-8">
                        로그인 페이지는 SSO 연동 서비스를 통해 접근해야 합니다.<br />
                        필수 파라미터(client_id, redirect_uri, state)가 누락되었습니다.
                    </p>
                    <a href="/developer" className="text-primary text-sm font-medium hover:underline">
                        개발자 포털로 이동
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* 배경 이미지 */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                style={{ backgroundImage: `url(${import.meta.env.BASE_URL}cse-building.jpg)` }}
            />
            {/* 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#191F28]/75 via-[#191F28]/55 to-[#1A196F]/50" />

            {/* 콘텐츠 */}
            <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-8 gap-8 lg:gap-16">
                <LoginIntroSection />
                <LoginCardSection />
            </div>
        </div>
    )
}
