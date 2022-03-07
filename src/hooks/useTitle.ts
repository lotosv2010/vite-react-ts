import { useEffect } from 'react';
import { getEnv } from '@/utils';

export default function useTitle(title?: string) {
  useEffect(() => {
    const { VITE_APP_TITLE } = getEnv();
    document.title = title ?? VITE_APP_TITLE ?? 'Vite Project';
  }, []);
}
