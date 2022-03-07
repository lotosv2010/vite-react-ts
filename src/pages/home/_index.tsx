import React, { useEffect } from 'react';
import { useStore, useTitle } from '@/hooks';
import { observer } from 'mobx-react';

function Index() {
  const global = useStore('globalStore');
  const layout = useStore('layoutStore');

  const setLan = async () => {
    const res = await global.setLanguage('en');
    console.log(import.meta.env);
    console.log(res);
    return res;
  };
  useTitle();
  useEffect(() => {
    fetch('/api/datav-res/datav/map.json')
      .then((res) => res.json())
      .then((data) => console.log(data));
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
