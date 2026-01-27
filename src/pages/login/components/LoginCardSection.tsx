import { useState } from 'react'

const translations = {
    ko: {
        welcome: '경북대학교 컴퓨터학부 통합인증시스템 방문을 환영합니다.',
        googleLogin: 'Google 계정으로 로그인',
        notice: '경북대학교 Google Workspace 계정(@knu.ac.kr)만 로그인 가능합니다.',
        terms: '이용 약관',
        privacy: '개인정보처리방침',
        emailPolicy: '이메일무단수집거부',
    },
    en: {
        welcome: 'Welcome to KNU CSE Integrated Authentication System.',
        googleLogin: 'Sign in with Google',
        notice: 'Only Kyungpook National University Google Workspace accounts (@knu.ac.kr) can sign in.',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        emailPolicy: 'Email Collection Refusal',
    },
}

export default function LoginCardSection() {
    const [language, setLanguage] = useState<'ko' | 'en'>('ko')
    const t = translations[language]

    return (
        <div className="w-[55%] bg-white rounded-2xl shadow-md p-10 flex flex-col justify-between">
            {/* 상단 영역 */}
            <div>
                {/* 언어 선택 (우측 상단) */}
                <div className="flex justify-end mb-6">
                    <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setLanguage('ko')}
                            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${language === 'ko'
                                ? 'bg-white text-gray-900'
                                : 'text-gray-600 hover:bg-white'
                                }`}
                        >
                            한국어
                        </button>
                        <button
                            onClick={() => setLanguage('en')}
                            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${language === 'en'
                                ? 'bg-white text-gray-900'
                                : 'text-gray-600 hover:bg-white'
                                }`}
                        >
                            English
                        </button>
                    </div>
                </div>
                {/* LOGIN 타이틀과 환영 문구 */}
                <div className="mb-4 flex items-center gap-4 justify-center">
                    <h2 className="text-primary text-2xl font-bold whitespace-nowrap">LOGIN</h2>
                    <p className="text-gray-900 text-xl leading-relaxed">
                        {t.welcome}
                    </p>
                </div>
            </div>

            {/* Google 로그인 버튼 - 세로 중앙 */}
            <div className="flex-1 flex items-center justify-center">
                <button className="w-[80%] bg-white border border-[1.5px] border-button-gray/80 rounded-lg px-6 py-6 flex flex-col items-center justify-center gap-3 hover:border-gray-400 transition-colors">
                    {/* Google G 로고 */}
                    <div className="w-12 h-12 flex items-center justify-center">
                        <img src="/Googlelogo.svg" alt="Google" className="w-full h-full" />
                    </div>
                    <span className="text-gray-900 font-medium text-base">{t.googleLogin}</span>
                </button>
            </div>

            {/* 하단: 안내 문구와 정책 링크 */}
            <div className="text-center mt-10">
                <p className="text-xs text-gray-600 mb-2">
                    {t.notice}
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                    <a href="#" className="hover:text-primary transition-colors">{t.terms}</a>
                    <span className="text-gray-400">|</span>
                    <a href="#" className="hover:text-primary transition-colors">{t.privacy}</a>
                    <span className="text-gray-400">|</span>
                    <a href="#" className="hover:text-primary transition-colors">{t.emailPolicy}</a>
                </div>
            </div>
        </div>
    )
}

