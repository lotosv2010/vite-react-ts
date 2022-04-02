import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from '@/App';
import stores from '@/stores';
import '@/index.scss';
// App 入口
ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
