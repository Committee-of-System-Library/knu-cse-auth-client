import { ReactNode } from 'react'

/**
 * 페이지 컨테이너 컴포넌트
 * 모든 페이지에서 공통으로 사용하는 레이아웃
 */
interface PageContainerProps {
    children: ReactNode
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full'
    className?: string
}

const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full',
}

export default function PageContainer({ 
    children, 
    maxWidth = 'md',
    className = '' 
}: PageContainerProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 lg:px-24 py-8">
            <div 
                className={`w-full ${maxWidthClasses[maxWidth]} bg-white rounded-2xl shadow-md p-6 lg:p-10 flex flex-col ${className}`}
            >
                {children}
            </div>
        </div>
    )
}

