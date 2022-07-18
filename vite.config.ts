import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');
import { VitePWA } from 'vite-plugin-pwa';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
    }),
    svgLoader({
      svgoConfig: {
        plugins: ['removeDimensions', 'prefixIds'],
      },
    }),
  ],
});
