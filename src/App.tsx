import PageRoutes from '@/components/PageRoutes';
import { BrowserRouter } from 'react-router-dom';
import routes from '@/routes/routes';

const App = () => {
  return (
    <BrowserRouter>
      <PageRoutes routes={routes} />
    </BrowserRouter>
  );
};

export default App;
