import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from '@/App';
import stores from '@/stores';
import '@/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
