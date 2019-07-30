import router from './router';
import { getToken } from './utils/token';

const whiteList = ['/login', '/register', '/'];

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (whiteList.indexOf(to.path) !== -1) {
      next({ path: '/order' });
    } else {
      next();
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next(`/login`);
  }
});