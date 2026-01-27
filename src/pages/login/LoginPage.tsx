import LoginIntroSection from './components/LoginIntroSection'
import LoginCardSection from './components/LoginCardSection'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex bg-gray-50 px-24 py-8 items-stretch">
            <LoginIntroSection />
            <LoginCardSection />
        </div>
    )
}

