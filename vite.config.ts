/// <reference types='vitest' />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginFonts } from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginFonts({
      google: {
        families: [
          {
            name: 'Cinzel Decorative',
            styles: 'wght@700',
          },
          {
            name: 'Quattrocento Sans',
            styles: 'wght@400;700',
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/support/setupFetchMocks.ts'],
  },
})
