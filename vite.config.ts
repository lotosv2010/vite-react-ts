import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import createVitePlugins from './config/plugins/index';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ...createVitePlugins()],
});
