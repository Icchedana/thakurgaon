import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './', // Ei line-ti add kora obosshokro
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'স্মার্ট ঠাকুরগাঁও',
        short_name: 'স্মার্ট ঠাকুরগাঁও',
        description: 'ঠাকুরগাঁও জেলার সকল জরুরি ও নাগরিক সেবা প্ল্যাটফর্ম',
        theme_color: '#065f46',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/9446/9446962.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://cdn-icons-png.flaticon.com/512/9446/9446962.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
