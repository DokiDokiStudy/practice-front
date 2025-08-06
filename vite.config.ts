// ESM 문법
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@types': path.resolve(__dirname, 'src/types'),
    },
  },
  base: './',
  build: {
    outDir: 'dist',
  },
  server: {
    host: true, // host에서 접근 가능
    port: 5173,
    strictPort: true
  }
})
