import axios from 'axios';

const api = axios.create({
  baseURL: 'http://5d556e6936ad770014cce06d.mockapi.io/api/v1/catalog/'
});

export default api;
