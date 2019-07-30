import axios from './base.js';

const baseUrl = '/api/orders';

const addOrder = (order) => {
  return axios.post(baseUrl, order);
};

export default {
  addOrder
};