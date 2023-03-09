import { ServerOptions, loadEnv } from 'vite';
import { VITE_APP_PORT, VITE_APP_OPEN } from '../index';

const createServer = (mode: string): ServerOptions => {
  console.log('mode', mode, loadEnv(mode, process.cwd()).VITE_API_HOST);
  return {
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
  };
};

export default createServer;
