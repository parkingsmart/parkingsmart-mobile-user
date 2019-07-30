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
  return axios.put(`${baseUrl}/${id}?oderID=${data}`);
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

const updatePassword = (id,data) => {
  return axios.put(`${baseUrl}/${id}`,{oldPassword:data.oldPassword,newPassword:data.password},{
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

export default {
  login,
  register,
  getAllOrders,
  putAnOrder,
  getByCarNums,
  updatePassword
};