import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// SubPath 배포 시 예: VITE_BASE_PATH=/appfn (빌드 시 --build-arg 또는 .env)
const basePath = (process.env.VITE_BASE_PATH as string)?.trim()
const base = basePath ? `/${basePath.replace(/^\/|\/$/g, '')}/` : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
