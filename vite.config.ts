// ESM 문법
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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


// CommonJs 문법
// const { defineConfig } = require('vite');
// const react = require('@vitejs/plugin-react');

// module.exports = defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist'
//   }
// });

