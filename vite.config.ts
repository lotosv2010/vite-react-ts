import { defineConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import createVitePlugins from './config/plugins/index';
import createServer from './config/server';
import createBuild from './config/build';
import createCss from './config/style';
import { VITE_APP_BASE } from './config';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => ({
  plugins: [react(), ...createVitePlugins(command)],
  base: VITE_APP_BASE,
  server: createServer(mode),
  build: createBuild(),
  css: createCss(),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}));
