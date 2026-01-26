export default function LoginIntroSection() {
    return (
        <div className="flex w-[40%] bg-left-bg flex-col justify-between p-12">
            <div className="flex flex-col items-center justify-center flex-1">
                <h1 className="text-primary text-3xl font-bold leading-tight text-center">
                    경북대학교<br />IT대학 컴퓨터학부 학생회
                </h1>
                <div className="space-y-3 w-[50%] mt-24">
                    <a href="https://cse.knu.ac.kr/index.php" target="_blank" rel="noopener noreferrer" className="bg-button-gray/10 border border-[1.5px] border-button-gray hover:bg-primary/10 hover:border-primary/80 text-gray-900 px-6 py-2.5 rounded-md w-full text-center transition-colors font-medium block">
                        컴퓨터학부 홈페이지
                    </a>
                    <a href="https://cse.knu.ac.kr/index.php" target="_blank" rel="noopener noreferrer" className="bg-button-gray/10 border border-[1.5px] border-button-gray hover:bg-primary/10 hover:border-primary/80 text-gray-900 px-6 py-2.5 rounded-md w-full text-center transition-colors font-medium block">
                        컴퓨터학부 홈페이지
                    </a>
                </div>
            </div>
            <div className="text-xs text-gray-600 space-y-1 mt-8">
                <p>경북대학교 IT대학 컴퓨터학부</p>
                <p>우)41566 대구광역시 북구 대학로 80 / IT대학 융복합관 (건물번호 : 415)</p>
                <p>TEL. 학부: 950-5550, 대학원 : 950-6420</p>
                <p>FAX. 053-957-4846</p>
                <p>E-mail. scse@knu.ac.kr</p>
                <p className="text-gray-500">Copyright© 2026, KNU CSE All rights reserved</p>
            </div>
        </div>
    )
}

