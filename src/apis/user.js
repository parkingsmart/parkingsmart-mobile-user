import axios from './base.js';

const baseUrl = '/api/users';

const getAllOrders = (id) => {
  return axios.get(`${baseUrl}/${id}`, {
    params: {
      msg: "all"
    }
  });
};
const getByCarNums = (id, msg) => {
  return axios.get(`${baseUrl}/${id}?msg=${msg}`, {
  });
};

const putAnOrder = (id, orderId, status) => {
  return axios.put(`${baseUrl}/${id}`, null, {
    params: {
      orderId,
      status
    }
  });
};

const getUserPromotion = (id) => {
  return axios.get(`${baseUrl}/${id}/promotions`);
};

const addPromotion = (id, type, shopMallName, amount) => {
  return axios.post(`${baseUrl}/${id}/promotions`, { type, shopMallName, amount });
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

const addPayPassword = (id, payPassword) => {
  return axios({
    method: "put",
    url: `${baseUrl}/${id}?payPassword=${payPassword}`,
  });
};

const updateOrderStatus = (id, orderId) => {
  return axios.patch(`${baseUrl}/${id}?orderId=${orderId}`);
};

const finishOrder = (id, orderId, promotionId) => {
  return axios.patch(`${baseUrl}/${id}?orderId=${orderId}&promotionId=${promotionId}`);
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
  getUserPromotion,
  addPayPassword,
  addPromotion,
  finishOrder
};