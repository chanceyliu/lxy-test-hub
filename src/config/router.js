import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const routes = [
  // 一级路由主页，redirect默认跳转至demo1主页
  {
    path: '/',
    meta: {id: 'main', icon: '', name: '主页'},
    redirect: '/demo1',
    component: () => import('@/views/Index'),
    children: [
      // 二级路由主页1，无默认跳转
      {
        path: '/demo1',
        name: 'demo1',
        meta: {id: 'demo1', icon: 'user', name: 'demo1'},
        component: () => import('@/views/demo1/Index'),
        children: [
          // 子页面，日历页面
          {
            path: '/calendar',
            name: 'calendar',
            meta: {id: 'calendar', icon: 'user', name: 'calendar'},
            component: () => import('@/views/demo1/content/Calendar')
          },
          // 子页面，#字棋页面
          {
            path: '/chess',
            name: 'chess',
            meta: {id: 'chess', icon: 'user', name: 'chess'},
            component: () => import('@/views/demo1/content/Chess')
          }
        ]
      }
    ]
  }
];


export default new Router({
  mode: 'history',
  routes: routes
})
