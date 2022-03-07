import React from 'react';
import { observer, inject } from 'mobx-react';

function About({ globalStore, layoutStore }: any) {
  return (
    <div>
      <p>About</p>
      <p>{globalStore.theme}</p>
      <p>{layoutStore.pathname}</p>
    </div>
  );
}

export default inject(...['globalStore', 'layoutStore'])(observer(About));
