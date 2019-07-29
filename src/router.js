import Vue from 'vue';
import Router from 'vue-router';
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
      path: '/order',
      name: 'Order',
      component: () => import('./views/Order')
    }
  ]
});
