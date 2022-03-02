import { useState } from 'react';
import logo from './assets/logo.svg';
import Styles from './app.module.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={Styles.App}>
      <header>
        <img src={logo} alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
