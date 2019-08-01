import axios from 'axios';
import { getToken, setToken, removeToken } from '@/utils/token';

axios.interceptors.request.use(function (config) {
  config.headers.authorization = getToken();
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  if (response.headers.authorization) {
    setToken(response.headers.authorization);
  }
  return response.data;
}, function (error) {
  if (error.response && error.response.status === 401) {
    removeToken();
  }
  return Promise.reject(error);
});

export default axios;
