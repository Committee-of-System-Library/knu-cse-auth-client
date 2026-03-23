import { useEffect, useState, useMemo } from 'react'
import { Search, Trash2, Loader2 } from 'lucide-react'
import { authApi, type Student } from '@/shared/api/auth.api'

const USER_TYPE_LABELS: Record<string, string> = {
    CSE_STUDENT: '컴공 학부생',
    KNU_OTHER_DEPT: '타과생',
    EXTERNAL: '외부인',
}

const USER_TYPE_COLORS: Record<string, string> = {
    CSE_STUDENT: 'bg-green-50 text-green-700',
    KNU_OTHER_DEPT: 'bg-blue-50 text-blue-700',
    EXTERNAL: 'bg-gray-100 text-gray-600',
}

const ROLES = ['ADMIN', 'EXECUTIVE', 'FINANCE', 'PLANNING', 'PR', 'CULTURE', 'STUDENT'] as const
const USER_TYPES = ['CSE_STUDENT', 'KNU_OTHER_DEPT', 'EXTERNAL'] as const

export default function AdminUsersPage() {
    const [users, setUsers] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [actionLoading, setActionLoading] = useState<number | null>(null)

    const load = () => {
        setLoading(true)
        authApi.adminUsers.list()
            .then(setUsers)
            .catch(() => alert('사용자 목록을 불러올 수 없습니다.'))
            .finally(() => setLoading(false))
    }

    useEffect(() => { load() }, [])

    const filtered = useMemo(() => {
        if (!query.trim()) return users
        const q = query.trim().toLowerCase()
        return users.filter(u =>
            u.studentNumber.toLowerCase().includes(q) ||
            u.name.toLowerCase().includes(q)
        )
    }, [users, query])

    const handleRoleChange = async (user: Student, role: string) => {
        setActionLoading(user.id)
        try {
            await authApi.adminUsers.changeRole(user.id, role)
            setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: role as Student['role'] } : u))
        } catch { alert('역할 변경에 실패했습니다.') }
        setActionLoading(null)
    }

    const handleTypeChange = async (user: Student, userType: string) => {
        setActionLoading(user.id)
        try {
            await authApi.adminUsers.changeUserType(user.id, userType)
            setUsers(prev => prev.map(u => u.id === user.id ? { ...u, userType: userType as Student['userType'] } : u))
        } catch { alert('유형 변경에 실패했습니다.') }
        setActionLoading(null)
    }

    const handleDelete = async (user: Student) => {
        if (!confirm(`정말 "${user.name}" 사용자를 삭제하시겠습니까?`)) return
        setActionLoading(user.id)
        try {
            await authApi.adminUsers.delete(user.id)
            setUsers(prev => prev.filter(u => u.id !== user.id))
        } catch { alert('삭제에 실패했습니다.') }
        setActionLoading(null)
    }

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
                        value={query}
                        onChange={e => setQuery(e.target.value)}
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
                        <tbody className="divide-y divide-surface-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <Loader2 className="w-5 h-5 animate-spin text-ink-200 mx-auto" />
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center text-ink-300 text-sm">
                                        {query ? '검색 결과가 없습니다.' : '등록된 사용자가 없습니다.'}
                                    </td>
                                </tr>
                            ) : filtered.map(user => (
                                <tr key={user.id} className="hover:bg-surface-50 transition-colors">
                                    <td className="px-6 py-3 text-sm text-ink font-mono">{user.studentNumber}</td>
                                    <td className="px-6 py-3 text-sm text-ink font-medium">{user.name}</td>
                                    <td className="px-6 py-3">
                                        <select
                                            value={user.userType}
                                            onChange={e => handleTypeChange(user, e.target.value)}
                                            disabled={actionLoading === user.id}
                                            className={`text-xs font-medium px-2 py-1 rounded-lg border-none cursor-pointer ${USER_TYPE_COLORS[user.userType] ?? 'bg-gray-100 text-gray-600'}`}
                                        >
                                            {USER_TYPES.map(t => (
                                                <option key={t} value={t}>{USER_TYPE_LABELS[t]}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-3">
                                        <select
                                            value={user.role ?? ''}
                                            onChange={e => handleRoleChange(user, e.target.value)}
                                            disabled={actionLoading === user.id}
                                            className="text-xs font-medium px-2 py-1 rounded-lg bg-surface-50 border-none cursor-pointer"
                                        >
                                            <option value="">없음</option>
                                            {ROLES.map(r => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <button
                                            onClick={() => handleDelete(user)}
                                            disabled={actionLoading === user.id}
                                            className="p-1.5 rounded-lg text-ink-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                                        >
                                            {actionLoading === user.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
