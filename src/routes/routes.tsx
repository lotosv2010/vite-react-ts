import React from 'react';
// lazy route
const Layout = React.lazy(() => import('../pages/_'));
const Dashboard = React.lazy(() => import('../pages/_index'));
const Home = React.lazy(() => import('../pages/home/_index'));
const HomeChild = React.lazy(() => import('../pages/home/child/_index'));
const HomeChildHello = React.lazy(() => import('../pages/home/child/_hello-world'));
const HomeChildDynamic = React.lazy(() => import('../pages/home/child/_[name]'));
const About = React.lazy(() => import('../pages/about/_index'));

function withSuspense(Component: any) {
  return (
    <React.Suspense fallback={null}>
      <Component />
    </React.Suspense>
  );
}

const routes = [
  {
    element: withSuspense(Layout),
    path: '/',
    children: [
      {
        index: true,
        element: withSuspense(Dashboard),
      },
      {
        path: 'home',
        children: [
          {
            index: true,
            element: withSuspense(Home),
          },
          {
            path: 'child',
            children: [
              {
                index: true,
                element: withSuspense(HomeChild),
              },
              {
                index: false,
                path: 'hello-world',
                element: withSuspense(HomeChildHello),
              },
              {
                index: false,
                path: ':name',
                element: withSuspense(HomeChildDynamic),
              },
            ],
          },
        ],
      },
      {
        path: 'about',
        children: [
          {
            index: true,
            element: withSuspense(About),
          },
        ],
      },
    ],
  },
];
export default routes;
