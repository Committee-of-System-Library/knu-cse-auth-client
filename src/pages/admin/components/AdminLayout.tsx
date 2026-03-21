import { NavLink, Outlet } from 'react-router-dom'
import { Users, ShieldCheck, Database, AppWindow, LayoutDashboard, LogOut } from 'lucide-react'

const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: '대시보드', end: true },
    { to: '/admin/users', icon: Users, label: '사용자 관리' },
    { to: '/admin/verifications', icon: ShieldCheck, label: '인증 요청' },
    { to: '/admin/registry', icon: Database, label: '학생 명단' },
    { to: '/admin/apps', icon: AppWindow, label: '클라이언트 관리' },
]

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-surface-50 flex">
            {/* 사이드바 */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-surface-200 fixed inset-y-0 left-0 z-20">
                {/* 로고 */}
                <div className="px-6 py-6 border-b border-surface-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                            <span className="text-white text-xs font-bold">C</span>
                        </div>
                        <div>
                            <p className="text-ink font-bold text-sm">CSE Admin</p>
                            <p className="text-ink-300 text-[10px]">백오피스</p>
                        </div>
                    </div>
                </div>

                {/* 내비게이션 */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-primary-50 text-primary'
                                        : 'text-ink-500 hover:bg-surface-100 hover:text-ink-700'
                                }`
                            }
                        >
                            <item.icon className="w-[18px] h-[18px]" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* 하단 */}
                <div className="px-3 py-4 border-t border-surface-100">
                    <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-ink-300 hover:text-danger hover:bg-red-50 w-full transition-all">
                        <LogOut className="w-[18px] h-[18px]" />
                        로그아웃
                    </button>
                </div>
            </aside>

            {/* 메인 콘텐츠 */}
            <main className="flex-1 lg:ml-64">
                {/* 모바일 헤더 */}
                <header className="lg:hidden bg-white border-b border-surface-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">C</span>
                        </div>
                        <p className="text-ink font-bold text-sm">CSE Admin</p>
                    </div>
                </header>

                {/* 모바일 하단 네비게이션 */}
                <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-surface-200 flex justify-around py-2 z-10">
                    {navItems.slice(0, 5).map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-medium transition-colors ${
                                    isActive ? 'text-primary' : 'text-ink-300'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-6 lg:p-10 pb-24 lg:pb-10">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
