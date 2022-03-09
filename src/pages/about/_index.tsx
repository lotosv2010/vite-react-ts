import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { getAboutInfo } from '@/apis/about';
import { withTranslation } from 'react-i18next';

function About({ globalStore, layoutStore, t }: any) {
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

export default withTranslation()(inject(...['globalStore', 'layoutStore'])(observer(About)));
