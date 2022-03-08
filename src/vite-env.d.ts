/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_TITLE: 'development' | 'test' | 'staging' | 'production';
  VITE_API_HOST: string;
}
