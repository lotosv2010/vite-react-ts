import React, { useEffect } from 'react';
import { useStore, useTitle } from '@/hooks';
import { observer } from 'mobx-react';
import { getMapData, getUserInfo } from '@/apis/home';

function Index() {
  const global = useStore('globalStore');
  const layout = useStore('layoutStore');

  const setLan = async () => {
    const res = await global.setLanguage('en');
    // console.log(import.meta.env);
    console.log(res);
    return res;
  };
  const getData = async () => {
    try {
      const res = await getMapData({ id: 111 });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const res = await getUserInfo({ id: 1001 });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useTitle();
  useEffect(() => {
    getData();
    getUser();
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
