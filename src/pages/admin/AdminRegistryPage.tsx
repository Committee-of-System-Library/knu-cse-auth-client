import { Upload, Plus, Search } from 'lucide-react'

export default function AdminRegistryPage() {
    return (
        <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-ink">학생 명단</h1>
                    <p className="text-ink-300 text-sm mt-1">컴퓨터학부 학생 명단을 관리합니다.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-surface-200 rounded-xl text-sm font-medium text-ink-700 hover:border-primary-200 hover:text-primary transition-all">
                        <Upload className="w-4 h-4" />
                        CSV 업로드
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors">
                        <Plus className="w-4 h-4" />
                        수동 추가
                    </button>
                </div>
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
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-surface-100">
                            <th className="text-left px-6 py-4 text-xs font-semibold text-ink-300 uppercase tracking-wider">학번</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-ink-300 uppercase tracking-wider">이름</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-ink-300 uppercase tracking-wider">전공</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-ink-300 uppercase tracking-wider">학년</th>
                            <th className="text-right px-6 py-4 text-xs font-semibold text-ink-300 uppercase tracking-wider">작업</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5} className="px-6 py-16 text-center text-ink-300 text-sm">
                                명단 데이터를 불러오는 중...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
