
interface Route {
  path: string;
  component: string;
  name: string;
}

interface MenuConfigItem {
  name: string;
  routes?: Route[]
}

const menuConfig:MenuConfigItem[] = [
  {
    name: 'py',
    routes: [
      { path: '/py/home', component: '@/pages/Home',name: 'name-home' },
      { path: '/py/zhihu', component: '@/pages/Zhihu', name: 'name-zhihu' },
      { path: '/py/toutiao', component: '@/pages/Toutiao', name: 'name-toutiao' },
      { path: '/py/upload', component: '@/pages/Upload', name: 'name-upload' },
    ]
  },
  {
    name: 'node',
    routes: [
      { path: '/node/test', component: '@/pages/Test',name: 'name-test' },
    ]
  },
  {
    name: 'name3',
  }
]

// 构造 umi 所需要的 routes
const routerConstructor = (menuConfig:MenuConfigItem[]) => {
  let resultRoutes:Route[] = []
  menuConfig.forEach(menu => {
    const { routes } = menu
    if( routes ){
      resultRoutes.push(...routes)
    }
  })
  return resultRoutes
}

const routes = [
  { path: '/login', component: '@/pages/Login' },
  {
    path: '/', 
    component: '@/layouts',
    routes: routerConstructor(menuConfig)
  },
  // 404 页面
  { path: '*', component: '@/pages/NotFound' },
]


export { routes, menuConfig }
