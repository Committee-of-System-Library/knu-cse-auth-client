import { NavLink, Outlet } from 'react-router-dom'
import { Plus, ArrowLeft } from 'lucide-react'

export default function DeveloperLayout() {
    return (
        <div className="min-h-screen bg-surface-50">
            {/* 헤더 */}
            <header className="bg-white border-b border-surface-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <NavLink to="/" className="text-ink-300 hover:text-ink transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </NavLink>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-ink rounded-xl flex items-center justify-center">
                                <span className="text-white text-xs font-bold">D</span>
                            </div>
                            <div>
                                <p className="text-ink font-bold text-sm">개발자 콘솔</p>
                                <p className="text-ink-300 text-[10px]">CSE SSO Developer</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <NavLink
                            to="/developer/apps/new"
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">새 앱 등록</span>
                        </NavLink>
                    </div>
                </div>
            </header>

            {/* 콘텐츠 */}
            <main className="max-w-5xl mx-auto px-6 py-8">
                <Outlet />
            </main>
        </div>
    )
}
