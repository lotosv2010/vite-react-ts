import { useRoutes } from 'react-router-dom';
import { generateRoutes } from '../routes';

function PageRoutes(props: any) {
  let { routes } = props;
  const routeConfig = generateRoutes();
  return useRoutes(routes ?? routeConfig);
}

export default PageRoutes;
