import axios from './base.js';

const baseUrl = '/api/users';

const getAllOrders = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};
const putAnOrder = (id, data) => {
  return axios.put(`${baseUrl}/${id}`, data);
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

export default {
  register,
  getAllOrders,
  putAnOrder
};