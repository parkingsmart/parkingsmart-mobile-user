import axios from './base.js';

const baseUrl = '/api/orders';

const addOrder = (order) => {
  return axios.post(baseUrl, order);
};

const updateOrderStatus = (orderId,statusCode) =>{
  return axios({
    method: "patch",
    url: `${baseUrl}/${orderId}?status=${statusCode}`,
  });
};
export default {
  addOrder,
  updateOrderStatus
};