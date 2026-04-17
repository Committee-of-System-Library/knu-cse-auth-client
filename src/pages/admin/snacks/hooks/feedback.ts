import type { HandoutResult } from '@/shared/api/snack.api'

const MUTE_KEY = 'snack-scanner-muted'

export function isMuted(): boolean {
    try {
        return localStorage.getItem(MUTE_KEY) === '1'
    } catch {
        return false
    }
}

export function setMuted(muted: boolean) {
    try {
        if (muted) localStorage.setItem(MUTE_KEY, '1')
        else localStorage.removeItem(MUTE_KEY)
    } catch {
        // ignore
    }
}

const SPEECH: Record<HandoutResult, string> = {
    OK: '인증되었습니다',
    DUPLICATE: '이미 받았습니다',
    UNPAID: '미납자입니다',
    NOT_FOUND: '등록되지 않은 학번입니다',
}

const BEEP_FREQ: Record<HandoutResult, number> = {
    OK: 880,
    DUPLICATE: 440,
    UNPAID: 220,
    NOT_FOUND: 180,
}

let audioCtx: AudioContext | null = null

function getAudioCtx(): AudioContext | null {
    if (audioCtx) return audioCtx
    try {
        const Ctor =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtx = new Ctor()
        return audioCtx
    } catch {
        return null
    }
}

function playBeep(result: HandoutResult) {
    const ctx = getAudioCtx()
    if (!ctx) return
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    try {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = result === 'OK' ? 'triangle' : 'sine'
        osc.frequency.value = BEEP_FREQ[result]
        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.01)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.24)
    } catch {
        // ignore
    }
}

function speak(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    try {
        window.speechSynthesis.cancel()
        const utter = new SpeechSynthesisUtterance(text)
        utter.lang = 'ko-KR'
        utter.rate = 1.15
        utter.pitch = 1
        utter.volume = 1
        window.speechSynthesis.speak(utter)
    } catch {
        // ignore
    }
}

export function playFeedback(result: HandoutResult) {
    if (isMuted()) return
    playBeep(result)
    // beep first, then voice — stagger slightly so they don't muddle
    window.setTimeout(() => speak(SPEECH[result]), 80)
}

/**
 * Some browsers refuse to start audio/TTS until a user gesture has occurred.
 * Call this from a click handler to prime both AudioContext and SpeechSynthesis.
 */
export function primeAudio() {
    const ctx = getAudioCtx()
    if (ctx?.state === 'suspended') ctx.resume().catch(() => {})
    try {
        if ('speechSynthesis' in window) {
            // utter an empty string to grant permission
            const u = new SpeechSynthesisUtterance(' ')
            u.volume = 0
            window.speechSynthesis.speak(u)
        }
    } catch {
        // ignore
    }
}
