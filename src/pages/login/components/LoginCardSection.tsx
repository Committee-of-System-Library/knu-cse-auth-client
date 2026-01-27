export default function LoginCardSection() {
    return (
        <div className="w-[55%] bg-white rounded-2xl shadow-md p-10 flex flex-col justify-between">
            {/* 상단 영역 */}
            <div>
                {/* 언어 선택 (우측 상단) */}
                <div className="flex justify-end mb-6">
                    <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                        <button className="px-4 py-2 rounded-md bg-white text-gray-900 font-medium text-sm">
                            한국어
                        </button>
                        <button className="px-4 py-2 rounded-md text-gray-600 font-medium text-sm hover:bg-white transition-colors">
                            English
                        </button>
                    </div>
                </div>
                {/* LOGIN 타이틀과 환영 문구 */}
                <div className="mb-4 flex items-center gap-4 justify-center">
                    <h2 className="text-primary text-2xl font-bold whitespace-nowrap">LOGIN</h2>
                    <p className="text-gray-900 text-xl leading-relaxed">
                        경북대학교 컴퓨터학부 통합 인증 시스템 방문을 환영합니다.
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
                    <span className="text-gray-900 font-medium text-base">Google 계정으로 로그인</span>
                </button>
            </div>

            {/* 하단: 안내 문구와 정책 링크 */}
            <div className="text-center mt-10">
                <p className="text-xs text-gray-600 mb-2">
                    경북대학교 Google Workspace 계정(@knu.ac.kr)만 로그인 가능합니다.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                    <a href="#" className="hover:text-primary transition-colors">이용 약관</a>
                    <span className="text-gray-400">|</span>
                    <a href="#" className="hover:text-primary transition-colors">개인정보처리방침</a>
                    <span className="text-gray-400">|</span>
                    <a href="#" className="hover:text-primary transition-colors">이메일무단수집거부</a>
                </div>
            </div>
        </div>
    )
}

