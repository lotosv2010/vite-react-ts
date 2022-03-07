import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import createVitePlugins from './config/plugins/index';
import cssOption from './config/style';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ...createVitePlugins()],
  css: cssOption,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
