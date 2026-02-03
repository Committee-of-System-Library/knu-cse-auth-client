/**
 * 로딩 스피너 컴포넌트
 */
interface LoadingSpinnerProps {
    message?: string
    size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
}

export default function LoadingSpinner({ 
    message = '로딩 중...', 
    size = 'md' 
}: LoadingSpinnerProps) {
    return (
        <div className="flex flex-col items-center justify-center">
            <div 
                className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]} mb-4`}
            />
            {message && (
                <p className="text-gray-600 text-center">{message}</p>
            )}
        </div>
    )
}

