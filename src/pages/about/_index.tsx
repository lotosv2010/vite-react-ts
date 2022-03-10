import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { getAboutInfo } from '@/apis/about';
import { useStore } from '@/hooks';
import { useTranslation } from 'react-i18next';

function About() {
  const globalStore = useStore('globalStore');
  const layoutStore = useStore('layoutStore');
  const { t } = useTranslation();
  const getData = async () => {
    try {
      const res = await getAboutInfo();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <p>About</p>
      <p>Mobx 测试：{globalStore.theme}</p>
      <p>Mobx 测试：{layoutStore.pathname}</p>
      <p>语言切换测试：{t('methods.hoc')}</p>
    </div>
  );
}

export default observer(About);
