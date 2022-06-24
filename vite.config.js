import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue(), VitePWA({})]
});
