export default function LoginIntroSection() {
    return (
        <div className="flex w-[40%] bg-left-bg flex-col justify-between p-12">
            <div>
                <h1 className="text-primary text-4xl font-bold mb-12 leading-tight text-center">
                    경북대학교<br />IT대학 컴퓨터학부 학생회
                </h1>
                <div className="space-y-3">
                    <button className="bg-button-gray hover:bg-gray-300 text-gray-900 px-6 py-3.5 rounded-md w-full text-center transition-colors font-medium">
                        컴퓨터학부 홈페이지
                    </button>
                    <button className="bg-button-gray hover:bg-gray-300 text-gray-900 px-6 py-3.5 rounded-md w-full text-center transition-colors font-medium">
                        컴퓨터학부 홈페이지
                    </button>
                </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1 mt-8">
                <p>경북대학교 IT대학 컴퓨터학부</p>
                <p>우)41566 대구광역시 북구 대학로 80 / IT대학 융복합관 (건물번호 : 415)</p>
                <p>TEL. 학부: 950-5550, 대학원 : 950-6420</p>
                <p>FAX. 053-957-4846</p>
                <p>E-mail. scse@knu.ac.kr</p>
                <p>담당자 현황 : 링크연결</p>
                <p className="mt-6 text-gray-500">Copyright(c) 2022, KNU CSE All rights reserved</p>
            </div>
        </div>
    )
}

