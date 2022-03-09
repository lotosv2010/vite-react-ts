import PageRoutes from '@/components/PageRoutes';
import { BrowserRouter } from 'react-router-dom';
import routes from '@/routes/routes';
import './locales/i18n';

const App = () => {
  return (
    <BrowserRouter>
      <PageRoutes routes={routes} />
    </BrowserRouter>
  );
};

export default App;
