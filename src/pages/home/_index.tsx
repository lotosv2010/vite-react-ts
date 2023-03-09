import React, { useEffect } from 'react';
import { useStore, useTitle } from '@/hooks';
import { observer } from 'mobx-react';
import { getMapData, getUserInfo } from '@/apis/home';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

function Index() {
  const global = useStore('globalStore');
  const layout = useStore('layoutStore');
  const { t } = useTranslation();

  const setLan = async () => {
    const res = await global.setLanguage('en');
    // console.log(import.meta.env);
    console.log(res);
    return res;
  };
  const getData = async () => {
    try {
      const res = await getMapData({ id: 11 });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const res = await getUserInfo({ id: 1 });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useTitle();
  useEffect(() => {
    getData();
    setTimeout(() => {
      global.setTheme('dark');
      setLan();
      layout.setPathname('/about');
    }, 1000);
  }, []);
  return (
    <div>
      <p>Home Index</p>
      <p>Mobx 测试：{global?.theme}</p>
      <p>Mobx 测试：{layout?.pathname}</p>
      <p>语言切换测试：{t('methods.hook')}</p>
      <div>
        <Button type="primary" onClick={getUser}>
          axios请求测试
        </Button>
      </div>
    </div>
  );
}

export default observer(Index);
