import type { Grade } from './types'

/** 전공 드롭다운 옵션 (프론트/운영 정책 목록) */
export const MAJOR_OPTIONS = [
  { value: '글로벌 SW융합전공(첨단컴퓨팅연구전공)', label: '글로벌 SW융합전공(첨단컴퓨팅연구전공)' },
  { value: '심화컴퓨팅 전공(플랫폼SW융합전공)', label: '심화컴퓨팅 전공(플랫폼SW융합전공)' },
  { value: '인공지능컴퓨팅 전공', label: '인공지능컴퓨팅 전공' },
] as const

/**
 * 학년 옵션 - 백엔드 Grade enum 고정 5개. API에는 value(영문 대문자) 전송.
 */
export const GRADE_OPTIONS: { value: Grade; label: string }[] = [
  { value: 'FIRST', label: '1학년' },
  { value: 'SECOND', label: '2학년' },
  { value: 'THIRD', label: '3학년' },
  { value: 'FOURTH', label: '4학년' },
  { value: 'OTHERS', label: '기타(휴학, 대학원 등)' },
]
