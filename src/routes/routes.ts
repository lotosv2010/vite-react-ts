import { lazyLoad } from '.';

const routes = [
  {
    element: lazyLoad('_'),
    path: '/',
    children: [
      {
        index: true,
        element: lazyLoad('_index'),
      },
      {
        path: 'home',
        children: [
          {
            index: true,
            element: lazyLoad('home/_index'),
          },
          {
            path: 'child',
            children: [
              {
                index: true,
                element: lazyLoad('home/child/_index'),
              },
              {
                index: false,
                path: 'hello-world',
                element: lazyLoad('home/child/_hello-world'),
              },
              {
                index: false,
                path: ':name',
                element: lazyLoad('home/child/_[name]'),
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
            element: lazyLoad('about/_index'),
          },
        ],
      },
    ],
  },
];
export default routes;
