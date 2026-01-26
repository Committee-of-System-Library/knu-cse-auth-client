import LoginIntroSection from './components/LoginIntroSection'
import LoginCardSection from './components/LoginCardSection'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex">
            <LoginIntroSection />
            <LoginCardSection />
        </div>
    )
}

