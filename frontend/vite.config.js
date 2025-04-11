import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  define: {
    'process.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL),
    'process.env.VITE_PROD_BACKEND_URL': JSON.stringify(process.env.VITE_PROD_BACKEND_URL)
  },
  server: {
    cors: {
      origin: ['https://persona-project-b.vercel.app'],
      methods: ['GET', 'POST', 'OPTIONS'],
      credentials: true
    },
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})