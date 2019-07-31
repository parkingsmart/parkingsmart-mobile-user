import axios from './base.js';

const baseUrl = '/api/parking-promotions';

const getAllPromotions = () => {
  return axios.get(baseUrl);
};

const getDiscount = (id, amount) => {
  return axios.get(`${baseUrl}/${id}?amount=${amount}`);
};

export default {
  getAllPromotions,
  getDiscount
};