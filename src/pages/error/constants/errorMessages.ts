import type { ErrorCode, ErrorMessage } from '@/shared/types/error'

export type { ErrorCode, ErrorMessage }

export const ERROR_MESSAGES: Record<ErrorCode, ErrorMessage> = {
    unauthorized_domain: {
        title: '인증 실패',
        description: '경북대학교 Google Workspace 계정(@knu.ac.kr)만 로그인 가능합니다.',
    },
    consent_required: {
        title: '동의 필요',
        description: '서비스 이용을 위해 약관 동의가 필요합니다.',
    },
    session_expired: {
        title: '세션 만료',
        description: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
    },
    network_error: {
        title: '네트워크 오류',
        description: '서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    },
    invalid_redirect: {
        title: '잘못된 요청',
        description: '리다이렉트 URL이 유효하지 않습니다.',
    },
    session_failed: {
        title: '세션 검증 실패',
        description: '로그인 세션을 확인할 수 없습니다. 다시 로그인해주세요.',
    },
    state_mismatch: {
        title: '로그인을 완료하지 못했어요',
        description:
            '다른 탭에서 로그인을 시도했거나, 세션이 만료되었을 수 있어요. 같은 탭에서 처음부터 다시 로그인해 주세요.',
    },
    state_missing: {
        title: '로그인을 완료하지 못했어요',
        description:
            '로그인 과정 중 연결이 끊겼을 수 있어요. 같은 탭에서 로그인을 다시 시도해 주세요.',
    },
    state_storage_lost: {
        title: '로그인을 완료하지 못했어요',
        description:
            '로그인을 시작한 화면과 돌아온 화면이 달라서 확인에 실패했어요. 브라우저에서 주소를 바꾸지 말고, 같은 탭에서 로그인을 처음부터 다시 시도해 주세요.',
    },
}

