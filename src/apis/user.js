import axios from './base.js';

const baseUrl = '/api/users';

const getAllOrders = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};
const getByCarNums = (id, msg) => {
  return axios.get(`${baseUrl}/${id}?msg=${msg}`, {
  });
};

const putAnOrder = (id, data) => {
  return axios.put(`${baseUrl}/${id}?orderID=${data}`);
};

const getUserPromotion = (id) => {
  return axios.get(`${baseUrl}/${id}/promotions`);
};

const register = ({ phone, password }) => {
  return axios.post(`${baseUrl}/registered`, { username: phone, password }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let newData = '';
      for (let k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
      return newData;
    }]
  });
};

const updatePassword = (id, data) => {
  return axios.put(`${baseUrl}/${id}`, { oldPassword: data.oldPassword, newPassword: data.password }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let newData = '';
      for (let k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
      return newData;
    }]
  });
};

const getUserInfo = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const login = ({ phone, password }) => {
  return axios.post(`${baseUrl}/login`, { username: phone, password }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let newData = '';
      for (let k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
      return newData;
    }]
  });
};

const updateOrderStatus = (id,orderId) =>{
  return axios.patch(`${baseUrl}/${id}?orderId=${orderId}`);
};

export default {
  login,
  register,
  getAllOrders,
  putAnOrder,
  getByCarNums,
  updatePassword,
  getUserInfo,
  updateOrderStatus,
  getUserPromotion
};