import axios from './base.js';

const baseUrl = '/api/parking-lots';

const getParkingLotById = (id) => {
  return axios.get(`${baseUrl}?id=${id}`);
};

export default {
  getParkingLotById
};