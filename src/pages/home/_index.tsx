import React, { useEffect } from 'react';
import { useStores } from '@/hooks/useStore';
import { observer } from 'mobx-react';

function Index() {
  const global = useStores('globalStore');
  const layout = useStores('layoutStore');

  const setLan = async () => {
    const res = await global.setLanguage('en');
    console.log(res);
    return res;
  };
  useEffect(() => {
    setTimeout(() => {
      global.setTheme('dark');
      setLan();
      layout.setPathname('/about');
    }, 1000);
  }, []);
  return (
    <div>
      <p>Home Index</p>
      <p>{global?.theme}</p>
      <p>{layout?.pathname}</p>
    </div>
  );
}

export default observer(Index);
