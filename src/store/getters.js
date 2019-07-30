import { getToken } from '../utils/token';

export default {
  id: (state) => {
    return state.userInfo ? state.userInfo.id : getToken();
  }
};