import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import createVitePlugins from './config/plugins/index';
import cssOption from './config/style';
import path from 'path';
import { VITE_APP_BASE, VITE_APP_PORT, VITE_APP_OPEN } from './config';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    plugins: [react(), ...createVitePlugins()],
    css: cssOption,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    base: VITE_APP_BASE,
    server: {
      host: true,
      port: VITE_APP_PORT,
      open: VITE_APP_OPEN,
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_API_HOST,
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
