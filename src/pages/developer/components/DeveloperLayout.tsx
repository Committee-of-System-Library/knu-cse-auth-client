import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogIn, LogOut, Lock } from 'lucide-react'
import { authApi } from '@/shared/api/auth.api'
import { buildSSOLoginUrl } from '@/shared/utils/oauth'

const STAFF_ROLES = new Set(['ADMIN', 'EXECUTIVE', 'FINANCE', 'PLANNING', 'PR', 'CULTURE'])

export default function DeveloperLayout() {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        authApi.me()
            .then((res) => {
                setIsLoggedIn(res.authenticated)
                setRole(res.role ?? null)
            })
            .catch(() => {
                setIsLoggedIn(false)
                setRole(null)
            })
    }, [])

    const isStaff = role !== null && STAFF_ROLES.has(role)

    const handleLogout = async () => {
        try { await authApi.logout() } catch { /* ignore */ }
        setIsLoggedIn(false)
        setRole(null)
        navigate('/developer')
    }

    const handleLogin = () => {
        const url = buildSSOLoginUrl({ returnPath: '/developer' })
        navigate(url)
    }

    return (
        <div className="min-h-screen bg-surface-50">
            <header className="bg-white border-b border-surface-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
                    <NavLink to="/developer" className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-ink rounded-lg flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">S</span>
                        </div>
                        <p className="text-ink font-bold text-sm">CSE SSO</p>
                    </NavLink>
                    <nav className="flex items-center gap-4 text-sm">
                        <NavLink
                            to="/developer"
                            end
                            className={({ isActive }) =>
                                `font-medium transition-colors ${isActive ? 'text-ink' : 'text-ink-300 hover:text-ink-500'}`
                            }
                        >
                            문서
                        </NavLink>
                        <NavLink
                            to="/developer/apps"
                            className={({ isActive }) =>
                                `font-medium transition-colors ${isActive ? 'text-ink' : 'text-ink-300 hover:text-ink-500'}`
                            }
                        >
                            내 앱
                        </NavLink>
                        {isStaff && (
                            <NavLink
                                to="/developer/architecture"
                                className={({ isActive }) =>
                                    `flex items-center gap-1.5 font-medium transition-colors ${
                                        isActive ? 'text-primary' : 'text-ink-300 hover:text-primary'
                                    }`
                                }
                            >
                                <Lock className="w-3 h-3" />
                                내부 아키텍처
                            </NavLink>
                        )}
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 text-ink-300 hover:text-danger font-medium transition-colors"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                로그아웃
                            </button>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="flex items-center gap-1.5 text-ink-300 hover:text-primary font-medium transition-colors"
                            >
                                <LogIn className="w-3.5 h-3.5" />
                                로그인
                            </button>
                        )}
                    </nav>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8">
                <Outlet context={{ isLoggedIn, role, isStaff }} />
            </main>
        </div>
    )
}

export type DeveloperOutletContext = {
    isLoggedIn: boolean
    role: string | null
    isStaff: boolean
}
