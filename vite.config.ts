import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// base: '' keeps asset URLs relative, so the built site works from any path
// (a LAN dev server, a sub-folder, or a static host) without rebuilding.
export default defineConfig({
  base: '',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      workbox: {
        // The whole app is ~300 KB of figures plus a tiny JS bundle, so
        // precaching everything makes it fully usable offline.
        globPatterns: ['**/*.{js,css,html,svg,png,webp,ico}'],
      },
      manifest: {
        name: 'My Collections',
        short_name: 'Collections',
        description: 'Track which figures you have collected.',
        theme_color: '#f7c948',
        background_color: '#fdfcf8',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
