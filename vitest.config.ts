import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    browser: {
      enabled: true,
      name: 'chrome',
      provider: 'webdriverio',
    },
    globals: true,
    include: ['**/*.test.{ts,tsx}'],
    setupFiles: ['./src/tests/setup.ts'],
    reporters: ['default', 'html'],
    environmentOptions: {
      happyDOM: {
        console: 'capture',
        settings: {
          enableGlobalFetch: true,
          enableJSDOM: true,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './'),
    },
  },
}) 