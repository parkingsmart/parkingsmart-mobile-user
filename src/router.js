import Vue from 'vue';
import Router from 'vue-router';
import UserOrder from './views/UserOrder.vue';
import Common from './views/Common.vue';
import OrderDetail from './views/OrderDetail.vue';
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
          component: UserOrder,
        },
        {
          path: '/order',
          name: 'Order',
          component: () => import('./views/Order')
        }
      ]
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      component: OrderDetail,
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
  ]
});
