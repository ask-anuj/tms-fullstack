import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: mode === 'development' ? {
    port: 5173,
    proxy: {
      '/graphql': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  } : undefined
}))
