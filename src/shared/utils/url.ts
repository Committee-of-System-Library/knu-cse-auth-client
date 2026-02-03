/**
 * URL 검증 및 처리 유틸리티
 */

/**
 * redirect URL이 안전한지 검증합니다.
 * 같은 origin만 허용하며, 상대 경로도 허용합니다.
 *
 * @param redirectUrl - 검증할 redirect URL
 * @returns 검증 결과 (true: 안전함, false: 안전하지 않음)
 */
export function isValidRedirectUrl(redirectUrl: string): boolean {
    if (!redirectUrl) {
        return false
    }

    // 절대 URL인 경우 같은 origin인지 확인
    if (redirectUrl.startsWith('http://') || redirectUrl.startsWith('https://')) {
        try {
            const redirectUrlObj = new URL(redirectUrl)
            return redirectUrlObj.origin === window.location.origin
        } catch {
            return false
        }
    }

    // 상대 경로(/로 시작)는 허용
    if (redirectUrl.startsWith('/')) {
        return true
    }

    // 그 외의 경우는 거부
    return false
}

/**
 * 에러 페이지로 이동하는 URL을 생성합니다.
 *
 * @param errorCode - 에러 코드
 * @param options - 추가 쿼리 파라미터 (redirect, requestId 등)
 * @returns 에러 페이지 URL
 */
export function buildErrorUrl(
    errorCode: string,
    options?: {
        redirect?: string
        requestId?: string
    }
): string {
    const params = new URLSearchParams({ code: errorCode })
    
    if (options?.redirect) {
        params.set('redirect', options.redirect)
    }
    
    if (options?.requestId) {
        params.set('requestId', options.requestId)
    }

    return `/error?${params.toString()}`
}

/**
 * redirect 파라미터를 포함한 URL을 생성합니다.
 *
 * @param path - 기본 경로
 * @param redirectUrl - redirect URL
 * @returns redirect 파라미터가 포함된 URL
 */
export function buildUrlWithRedirect(path: string, redirectUrl: string): string {
    const params = new URLSearchParams({ redirect: redirectUrl })
    return `${path}?${params.toString()}`
}

