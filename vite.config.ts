/// <reference types='vitest' />
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginFonts } from 'vite-plugin-fonts'
import replace from '@rollup/plugin-replace'

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
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [
        replace({
          'process.env': JSON.stringify({
            VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
            VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
            VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
            VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
            VITE_FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
            VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
          })
        })
      ]
    }
  } as UserConfig['build'],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
})
