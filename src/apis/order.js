import axios from './base.js';

const baseUrl = '/api/orders';

const addOrder = (order) => {
  return axios.post(baseUrl, order);
};

const payAnOrder = (id, endTime) => {
  return axios.patch(`${baseUrl}/${id}?endTime=${endTime}`);
};

export default {
  addOrder,
  payAnOrder
};