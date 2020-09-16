import { join } from 'lodash';

interface Route {
  path: string;
  component: string;
  name: string;
}

interface MenuConfigItem {
  name: string;
  routes?: Route[];
}

const menuConfig: MenuConfigItem[] = [
  {
    name: 'py',
    routes: [
      { path: '/py/home', component: '@/pages/py/Home', name: 'name-home' },
      { path: '/py/zhihu', component: '@/pages/py/Zhihu', name: 'name-zhihu' },
      {
        path: '/py/toutiao',
        component: '@/pages/py/Toutiao',
        name: 'name-toutiao',
      },
      {
        path: '/py/upload',
        component: '@/pages/py/Upload',
        name: 'name-upload',
      },
    ],
  },
  {
    name: 'node',
    routes: [
      { path: '/node/test', component: '@/pages/node/Test', name: 'name-test' },
    ],
  },
  {
    name: 'fe',
    routes: [
      {
        path: '/fe/CodeMirror',
        component: '@/pages/fe/CodeMirror',
        name: 'CodeMirror',
      },
      {
        path: '/fe/AntdFormComponents',
        component: '@/pages/fe/AntdFormComponents',
        name: 'AntdFormComponents',
      },
      {
        path: '/fe/TextScroll',
        component: '@/pages/fe/TextScrollExample',
        name: 'TextScroll',
      },
      {
        path: '/fe/InputEdit',
        component: '@/pages/fe/InputEditExample',
        name: 'InputEdit',
      },
    ],
  },
];

// const fs = require('fs');
// const path = require('path');
// console.log(path.join(__filename, '../pages'));

// console.log(fs.readFileSync(path.join(__filename, '../pages')));

// 构造 umi 所需要的 routes
const routerConstructor = (menuConfig: MenuConfigItem[]) => {
  let resultRoutes: Route[] = [];
  menuConfig.forEach(menu => {
    const { routes } = menu;
    if (routes) {
      resultRoutes.push(...routes);
    }
  });
  return resultRoutes;
};

const routes = [
  { path: '/login', component: '@/pages/Login' },
  {
    path: '/',
    component: '@/layouts',
    routes: [
      ...routerConstructor(menuConfig),
      { path: '*', component: '@/pages/NotFound' },
    ],
  },
  // 404 页面
];

export { routes, menuConfig };
