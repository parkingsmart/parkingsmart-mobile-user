import Vue from 'vue';
import Router from 'vue-router';
import Order from './views/Order.vue';
Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Order',
      component: Order
    },
  ]
});
