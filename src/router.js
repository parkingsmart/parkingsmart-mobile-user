import Vue from 'vue';
import Router from 'vue-router';
import Common from './views/Common.vue';
Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: () => import('./views/Welcome')
    },
    {
      name: 'common',
      path: '/user-order',
      redirect: '/user-order',
      component: Common,
      children: [
        {
          path: '/user-order',
          name: 'user-order',
          component: () => import('./views/UserOrder'),
        },
        {
          path: '/order',
          name: 'Order',
          component: () => import('./views/Order')
        },
        {
          path: '/user-info',
          name: 'UserInfo',
          component: () => import('./views/UserInfo')
        },
      ]
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      component: () => import('./views/OrderDetail'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login')
    },
    {
      path: '/user-info',
      name: 'UserInfo',
      component: () => import('./views/UserInfo')
    },
  ]
});
