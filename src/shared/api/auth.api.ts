import { http } from "./http"

export type MeResponse = {
    authenticated: boolean
    email?: string
    role?: string
    needsConsent?: boolean
}

export const authApi = {
    me: () => http<MeResponse>("/api/auth/me"),
}