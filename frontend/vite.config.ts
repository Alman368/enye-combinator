import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Production HMR configuration (only used in production)
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: [
        'combinator.fluwy.es',
        'localhost',
        '.fluwy.es'
      ],
      // Only use production HMR settings when explicitly needed
      // For local dev, this will use default localhost HMR
      hmr: isProduction ? {
        host: 'combinator.fluwy.es',
        protocol: 'wss',
        port: 443
      } : {
        // Development defaults to localhost
        host: 'localhost',
        port: 3129
      }
    }
  }
})
