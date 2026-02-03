import { HttpError } from '../api/http'
import { buildErrorUrl } from './url'

/**
 * HTTP 에러에서 상태 코드를 추출합니다.
 *
 * @param error - 에러 객체
 * @returns HTTP 상태 코드 (없으면 null)
 */
export function extractHttpStatusCode(error: unknown): number | null {
    if (error instanceof HttpError) {
        return error.status
    }
    
    if (error instanceof Error) {
        const match = error.message.match(/HTTP (\d+):/)
        if (match) {
            return parseInt(match[1], 10)
        }
    }
    
    return null
}

/**
 * 에러 타입에 따라 적절한 에러 코드를 반환합니다.
 *
 * @param error - 에러 객체
 * @returns 에러 코드
 */
export function getErrorCodeFromException(error: unknown): string {
    const statusCode = extractHttpStatusCode(error)

    if (statusCode === 401 || statusCode === 403) {
        return 'session_failed'
    }

    return 'network_error'
}

/**
 * 에러를 처리하고 적절한 페이지로 리다이렉트합니다.
 *
 * @param error - 에러 객체
 * @param navigate - React Router navigate 함수
 * @param options - 추가 옵션 (redirect, requestId 등)
 */
export function handleError(
    error: unknown,
    navigate: (path: string) => void,
    options?: {
        redirect?: string
        requestId?: string
    }
): void {
    const errorCode = getErrorCodeFromException(error)
    const errorUrl = buildErrorUrl(errorCode, options)
    navigate(errorUrl)
}

