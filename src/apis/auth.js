import axios from './base';

export const login = (username, password) => {
  return axios.post('/api/login', {
    username,
    password
  });
};

export const getUserInfo = (phone) => {
  return axios.get(`/api/users`, {
    params: {
      phone
    }
  });
};

export const logout = () => {
  return Promise.resolve();
};
