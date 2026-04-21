import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Lock, AlertTriangle, Clock, FileText } from 'lucide-react'
import { authApi, type ArchitectureDoc, type ArchitectureBlock } from '@/shared/api/auth.api'
import type { DeveloperOutletContext } from './components/DeveloperLayout'
import LoadingSpinner from '@/shared/components/LoadingSpinner'

type LoadState =
    | { kind: 'loading' }
    | { kind: 'error'; message: string; status?: number }
    | { kind: 'ok'; doc: ArchitectureDoc }

export default function DeveloperArchitecturePage() {
    const { isLoggedIn, isStaff } = useOutletContext<DeveloperOutletContext>()
    const [state, setState] = useState<LoadState>({ kind: 'loading' })

    useEffect(() => {
        if (!isLoggedIn || !isStaff) return
        let active = true
        authApi.developerDocs.architecture()
            .then((doc) => { if (active) setState({ kind: 'ok', doc }) })
            .catch((err: Error & { status?: number }) => {
                if (!active) return
                setState({ kind: 'error', message: err.message, status: err.status })
            })
        return () => { active = false }
    }, [isLoggedIn, isStaff])

    if (!isLoggedIn) return <GateMessage title="로그인이 필요합니다" body="내부 아키텍처 문서는 임원 권한이 있는 사용자만 열람할 수 있습니다." />
    if (!isStaff) return <GateMessage title="권한이 부족합니다" body="ADMIN 또는 학생회 임원 계정으로만 열람 가능합니다." tone="forbidden" />

    if (state.kind === 'loading') {
        return (
            <div className="py-24">
                <LoadingSpinner message="문서 로드 중..." size="md" />
            </div>
        )
    }

    if (state.kind === 'error') {
        return (
            <div className="py-10">
                <div className="bg-white rounded-lg border border-surface-200 p-6 flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                    <div>
                        <h2 className="text-sm font-semibold text-ink">문서를 불러올 수 없습니다</h2>
                        <p className="text-ink-500 text-sm mt-1">
                            {state.status ? `HTTP ${state.status} — ` : ''}
                            {state.message}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const { doc } = state

    return (
        <div className="animate-fade-up">
            <header className="py-10">
                <div className="flex items-center gap-2 text-primary text-xs font-semibold tracking-[0.15em] uppercase mb-3">
                    <Lock className="w-3 h-3" />
                    Internal · Staff Only
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-ink leading-tight mb-3">
                    플랫폼 아키텍처
                </h1>
                <p className="text-ink-500 text-base max-w-2xl leading-relaxed">
                    8개 서브 레포가 구성하는 운영 구조 전반. 이 화면에 표시되는 정보는 서버에서 역할 검증 후 응답됩니다.
                </p>
                <div className="mt-6 flex items-center gap-4 text-xs text-ink-300">
                    <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> 업데이트 {doc.updatedAt}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <FileText className="w-3 h-3" /> {doc.sections.length} 섹션
                    </span>
                </div>
            </header>

            <nav aria-label="섹션 목차" className="py-6 border-t border-surface-200">
                <ul className="flex flex-wrap gap-2">
                    {doc.sections.map((s) => (
                        <li key={s.id}>
                            <a
                                href={`#${s.id}`}
                                className="inline-flex items-center px-3 py-1.5 bg-white border border-surface-200 rounded-full text-xs text-ink-500 hover:text-ink hover:border-ink-300 transition-colors"
                            >
                                {s.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {doc.sections.map((section) => (
                <section
                    key={section.id}
                    id={section.id}
                    className="py-10 border-t border-surface-200 scroll-mt-16"
                >
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-ink mb-1">{section.title}</h2>
                        <p className="text-ink-300 text-sm">{section.summary}</p>
                    </div>
                    <div className="space-y-6">
                        {section.blocks.map((block, idx) => (
                            <BlockView key={idx} block={block} />
                        ))}
                    </div>
                </section>
            ))}

            <footer className="py-10 border-t border-surface-200">
                <p className="text-ink-300 text-xs">
                    이 문서는 staff 계정에게만 응답되는 내부 자료입니다. 외부 공유·스크린샷 배포를 자제해주세요.
                </p>
            </footer>
        </div>
    )
}

function BlockView({ block }: { block: ArchitectureBlock }) {
    return (
        <div>
            <h3 className="text-[13px] font-semibold text-ink-500 uppercase tracking-wider mb-3">
                {block.heading}
            </h3>
            {block.type === 'bullets' && block.bullets && (
                <ul className="space-y-2">
                    {block.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-ink-700 leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-ink-300 flex-shrink-0" />
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>
            )}
            {block.type === 'table' && block.rows && block.headers && (
                <div className="bg-white rounded-lg border border-surface-200 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-surface-200 bg-surface-50">
                                {block.headers.map((h, i) => (
                                    <th
                                        key={i}
                                        className="text-left px-4 py-2.5 text-[12px] font-semibold text-ink-500 uppercase tracking-wider whitespace-nowrap"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-100">
                            {block.rows.map((r, i) => (
                                <tr key={i}>
                                    {r.cells.map((c, j) => (
                                        <td
                                            key={j}
                                            className={`px-4 py-2.5 ${
                                                j === 0
                                                    ? 'text-ink font-medium text-[13px]'
                                                    : 'text-ink-500 text-[13px]'
                                            }`}
                                        >
                                            {c}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

function GateMessage({
    title,
    body,
    tone = 'auth',
}: {
    title: string
    body: string
    tone?: 'auth' | 'forbidden'
}) {
    return (
        <div className="py-24">
            <div className="max-w-lg mx-auto text-center">
                <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        tone === 'forbidden' ? 'bg-red-50 text-danger' : 'bg-surface-100 text-ink-500'
                    }`}
                >
                    <Lock className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-ink mb-2">{title}</h1>
                <p className="text-ink-500 text-sm mb-6">{body}</p>
                <Link
                    to="/developer"
                    className="inline-flex px-4 py-2 border border-surface-300 rounded-lg text-sm font-medium text-ink-700 hover:bg-surface-50 transition-colors"
                >
                    문서 홈으로
                </Link>
            </div>
        </div>
    )
}
