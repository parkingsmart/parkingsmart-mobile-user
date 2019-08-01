import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios';
import './permission';
import 'vant/lib/icon/local.css';

Vue.use(Vant);
Vue.use(axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
