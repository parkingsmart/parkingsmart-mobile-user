import axios from './base.js';

const baseUrl = 'http://localhost:8080/api/orders';

const addOrder = (order) => {
  return axios.post(baseUrl, order);
};

export default {
  addOrder
};