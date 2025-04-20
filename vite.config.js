import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Use relative paths for easier deployment
  base: './',
  plugins: [
    vue(),
    //vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  /* Configure the server to be accessible from external devices
     for testing purposes */
  server: {
    host: '0.0.0.0', // Listen on all interfaces
    port: 5173,      // Default port (optional)
  },
})
