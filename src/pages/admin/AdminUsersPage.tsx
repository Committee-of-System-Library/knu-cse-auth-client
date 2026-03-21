import { Search } from 'lucide-react'

export default function AdminUsersPage() {
    return (
        <div className="animate-fade-up">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-ink">사용자 관리</h1>
                <p className="text-ink-300 text-sm mt-1">등록된 사용자를 조회하고 역할을 관리합니다.</p>
            </div>

            {/* 검색 */}
            <div className="bg-white rounded-2xl shadow-card p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-200" />
                    <input
                        type="text"
                        placeholder="학번 또는 이름으로 검색"
                        className="w-full pl-11 pr-4 py-3 bg-surface-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                </div>
            </div>

            {/* 테이블 */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-surface-100">
                                <th className="text-left px-6 py-4 text-xs font-semibold text-ink-300 uppercase tracking-wider">학번</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-ink-300 uppercase tracking-wider">이름</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-ink-300 uppercase tracking-wider">유형</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-ink-300 uppercase tracking-wider">역할</th>
                                <th className="text-right px-6 py-4 text-xs font-semibold text-ink-300 uppercase tracking-wider">작업</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={5} className="px-6 py-16 text-center text-ink-300 text-sm">
                                    사용자 데이터를 불러오는 중...
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
