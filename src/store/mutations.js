import { setToken } from '@/utils/token';

export default {
  setOrderDetail(state, data) {
    state.orderDetail = data;
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    setToken(userInfo.id);
  }
};