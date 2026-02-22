/**
 * HTTP 에러 클래스
 */
export class HttpError extends Error {
    status: number
    responseText?: string
    constructor(status: number, message: string, responseText?: string) {
        super(`HTTP ${status}: ${message}`)
        this.name = 'HttpError'
        this.status = status
        this.responseText = responseText
    }
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

/**
 * HTTP 요청을 수행하는 유틸리티 함수
 *
 * @param path - API 경로
 * @param init - Fetch 요청 옵션
 * @returns 응답 데이터
 * @throws HttpError - HTTP 에러 발생 시
 */
export async function http<T>(path: string, init: RequestInit = {}): Promise<T> {
    try {
        const res = await fetch(`${BASE_URL}${path}`, {
            ...init,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(init.headers ?? {}),
            },
        })

        if (!res.ok) {
            const text = await res.text().catch(() => "")
            throw new HttpError(res.status, text || res.statusText, text)
        }

        return (await res.json()) as T
    } catch (error) {
        // HttpError는 그대로 전파
        if (error instanceof HttpError) {
            throw error
        }
        // 네트워크 에러 등 기타 에러
        throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}