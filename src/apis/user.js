import axios from './base.js';

const getAllOrders = (id) => {
  return axios.get('/api/users/' + id);
};
const putAnOrder = (id, data) => {
  return axios.put('/api/users/' + id, data);
};
export default {
  getAllOrders,
  putAnOrder
};