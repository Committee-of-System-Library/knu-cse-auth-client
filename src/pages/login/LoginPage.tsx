import LoginIntroSection from './components/LoginIntroSection'
import LoginCardSection from './components/LoginCardSection'

export default function LoginPage() {
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
