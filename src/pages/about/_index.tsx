import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { getAboutInfo } from '@/apis/about';

function About({ globalStore, layoutStore }: any) {
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
      <p>{globalStore.theme}</p>
      <p>{layoutStore.pathname}</p>
    </div>
  );
}

export default inject(...['globalStore', 'layoutStore'])(observer(About));
