import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimización del bundle
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendors grandes en chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'react-icons', 'react-toastify'],
        },
      },
    },
    // Tamaño máximo de chunk warning
    chunkSizeWarningLimit: 1000,
    // Minificación con esbuild (más rápido que terser)
    minify: 'esbuild',
    // Sourcemaps para debugging (opcional en producción)
    sourcemap: false,
  },
  // Optimización de servidor de desarrollo
  server: {
    port: 5173,
    open: true,
  },
  // Preview server
  preview: {
    port: 4173,
    open: true,
  },
})
