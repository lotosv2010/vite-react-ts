import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import createVitePlugins from './config/plugins/index';
import cssOption from './config/style';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ...createVitePlugins()],
  css: cssOption,
});
