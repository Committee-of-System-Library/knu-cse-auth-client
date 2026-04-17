import { useEffect, useRef, useState, useCallback } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

const ELEMENT_ID = 'snack-qr-region'
const STUDENT_NUMBER_LENGTH = 10
const RESCAN_DEBOUNCE_MS = 1500

export type ScannerState = 'idle' | 'starting' | 'running' | 'denied' | 'error'

type Options = {
    onStudentNumber: (studentNumber: string) => void
    enabled: boolean
}

type CapsWithTorch = MediaTrackCapabilities & { torch?: boolean }
type ConstraintsWithTorch = MediaTrackConstraints & {
    advanced?: Array<MediaTrackConstraintSet & { torch?: boolean }>
}

export function useScanner({ onStudentNumber, enabled }: Options) {
    const [state, setState] = useState<ScannerState>('idle')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [hasTorch, setHasTorch] = useState(false)
    const [torchOn, setTorchOn] = useState(false)
    const scannerRef = useRef<Html5Qrcode | null>(null)
    const lastScanRef = useRef<{ value: string; at: number }>({ value: '', at: 0 })
    const onStudentNumberRef = useRef(onStudentNumber)

    useEffect(() => {
        onStudentNumberRef.current = onStudentNumber
    }, [onStudentNumber])

    useEffect(() => {
        if (!enabled) return

        let cancelled = false
        const scanner = new Html5Qrcode(ELEMENT_ID, { verbose: false })
        scannerRef.current = scanner
        setState('starting')

        // Higher resolution + continuous focus dramatically improves QR detection
        // in low light and at angles. qrbox is omitted intentionally so the
        // scanner reads the entire video frame — the on-screen brackets are
        // just a visual hint, not a hard constraint.
        const videoConstraints: MediaTrackConstraints = {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
        }

        scanner
            .start(
                { facingMode: 'environment' },
                {
                    fps: 15,
                    aspectRatio: window.innerHeight / window.innerWidth,
                    disableFlip: false,
                    videoConstraints,
                },
                (decodedText) => {
                    const studentNumber = decodedText.substring(0, STUDENT_NUMBER_LENGTH)
                    if (studentNumber.length < STUDENT_NUMBER_LENGTH) return

                    const now = Date.now()
                    const last = lastScanRef.current
                    if (last.value === studentNumber && now - last.at < RESCAN_DEBOUNCE_MS) {
                        return
                    }
                    lastScanRef.current = { value: studentNumber, at: now }
                    onStudentNumberRef.current(studentNumber)
                },
                () => {
                    // ignore per-frame decode failures
                }
            )
            .then(() => {
                if (cancelled) return
                setState('running')

                // Detect torch capability after the stream is live
                try {
                    const caps = scanner.getRunningTrackCapabilities() as CapsWithTorch
                    if (caps && caps.torch) setHasTorch(true)
                } catch {
                    // ignore
                }
            })
            .catch((err: unknown) => {
                if (cancelled) return
                const message = err instanceof Error ? err.message : String(err)
                if (
                    message.toLowerCase().includes('permission') ||
                    message.toLowerCase().includes('notallowed')
                ) {
                    setState('denied')
                    setErrorMessage('카메라 권한이 거부되었습니다. 브라우저 설정에서 허용해 주세요.')
                } else {
                    setState('error')
                    setErrorMessage(message)
                }
            })

        return () => {
            cancelled = true
            const s = scannerRef.current
            scannerRef.current = null
            if (s) {
                s.stop()
                    .then(() => s.clear())
                    .catch(() => {
                        // already stopped
                    })
            }
        }
    }, [enabled])

    const toggleTorch = useCallback(async () => {
        const s = scannerRef.current
        if (!s || !hasTorch) return
        const next = !torchOn
        try {
            await s.applyVideoConstraints({
                advanced: [{ torch: next }],
            } as ConstraintsWithTorch)
            setTorchOn(next)
        } catch {
            // device may not actually support runtime torch toggle
            setHasTorch(false)
        }
    }, [hasTorch, torchOn])

    return { state, errorMessage, elementId: ELEMENT_ID, hasTorch, torchOn, toggleTorch }
}
