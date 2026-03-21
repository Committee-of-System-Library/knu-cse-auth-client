// tailwind.config.ts
import type { Config } from "tailwindcss"

export default {
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#615FFF',
                    50: '#F0F0FF',
                    100: '#E0DFFF',
                    200: '#C2C0FF',
                    300: '#A3A0FF',
                    400: '#8280FF',
                    500: '#615FFF',
                    600: '#4D4BDB',
                    700: '#3A38B7',
                    800: '#282793',
                    900: '#1A196F',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    50: '#FAFBFC',
                    100: '#F4F6F8',
                    200: '#E9ECF0',
                    300: '#D1D6DB',
                },
                ink: {
                    DEFAULT: '#191F28',
                    700: '#333D4B',
                    500: '#6B7684',
                    300: '#8B95A1',
                    200: '#B0B8C1',
                    100: '#D1D6DB',
                },
                success: '#00C471',
                warning: '#FF9900',
                danger: '#F04452',
                'left-bg': '#F8FAFF',
                'button-gray': '#DADADA',
            },
            fontFamily: {
                sans: ['Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
                'elevated': '0 12px 40px rgba(0, 0, 0, 0.12)',
                'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
            },
            borderRadius: {
                '2xl': '16px',
                '3xl': '20px',
                '4xl': '24px',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'fade-up': 'fadeUp 0.6s ease-out',
                'slide-in': 'slideIn 0.4s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateX(-12px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
} satisfies Config
