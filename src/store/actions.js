import { login, logout, getUserInfo } from '@//apis/auth';
import { removeToken } from '@/utils/token';

export default {
  async login({ dispatch }, { username, password }) {
    username = username.trim();
    await login(username, password);
    await dispatch('getUserInfo', username);
  },
  async getUserInfo({ commit }, phone) {
    const data = await getUserInfo(phone);
    commit('setUserInfo', data);
  },
  async logout({ commit }) {
    await logout();
    commit('setUserInfo', null);
    removeToken();
  }
};