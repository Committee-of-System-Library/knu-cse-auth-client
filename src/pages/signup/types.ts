/**
 * 학년 - 백엔드 Grade enum과 동일. API에는 이 문자열 그대로 전송.
 */
export type Grade = 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH' | 'OTHERS'

/**
 * 회원가입 폼 데이터 (API/동의 페이지 전달용)
 * - major: 자유 입력 문자열, 백엔드 varchar(50) @NotBlank
 * - grade: 고정 enum 5개 중 하나, API에는 영문 대문자 문자열
 */
export interface SignupFormData {
  studentId: string
  major: string
  grade: Grade
}

/** 폼 입력 중일 때만 사용 (grade 미선택 시 '') */
export type SignupFormState = Omit<SignupFormData, 'grade'> & { grade: Grade | '' }
