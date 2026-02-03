import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authApi } from '../shared/api/auth.api'
import { ROUTES, QUERY_PARAMS } from '../shared/constants/routes'
import { isValidRedirectUrl, buildUrlWithRedirect } from '../shared/utils/url'
import { handleError } from '../shared/utils/error'
import PageContainer from '../shared/components/PageContainer'
import LoadingSpinner from '../shared/components/LoadingSpinner'

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const validateAndRedirect = async () => {
      try {
        // 1. redirect 파라미터 파싱 및 검증
        const redirectUrl = searchParams.get(QUERY_PARAMS.REDIRECT)

        if (!redirectUrl || !isValidRedirectUrl(redirectUrl)) {
          navigate(`${ROUTES.ERROR}?code=invalid_redirect`)
          return
        }

        // 2. GET /api/auth/me 호출
        const response = await authApi.me()

        // 3. 분기 처리
        if (response.needsConsent) {
          // 동의 필요 → /consent로 이동
          navigate(buildUrlWithRedirect(ROUTES.CONSENT, redirectUrl))
        } else {
          // 정상 로그인 → redirect로 이동
          window.location.href = redirectUrl
        }
      } catch (error) {
        // 에러 처리
        handleError(error, navigate, {
          redirect: searchParams.get(QUERY_PARAMS.REDIRECT) || undefined,
        })
      } finally {
        setIsLoading(false)
      }
    }

    validateAndRedirect()
  }, [searchParams, navigate])

  return (
    <PageContainer maxWidth="md" className="items-center justify-center">
      {isLoading ? (
        <LoadingSpinner message="로그인 확인 중..." size="md" />
      ) : (
        <p className="text-gray-600 text-center">리다이렉트 중...</p>
      )}
    </PageContainer>
  )
}
