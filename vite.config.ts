/// <reference types='vitest' />
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginFonts } from 'vite-plugin-fonts'
import { type ProcessEnv } from 'node:process'

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
    env: {
      FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
    } as ProcessEnv,
  } as UserConfig['build'],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
})
