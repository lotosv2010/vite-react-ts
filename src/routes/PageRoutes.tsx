import { useRoutes } from 'react-router-dom';
import generateRouteConfig from './generateRouteConfig';

function PageRoutes() {
  const routeConfig = generateRouteConfig();
  const routes = useRoutes(routeConfig);
  return routes;
}

export default PageRoutes;
