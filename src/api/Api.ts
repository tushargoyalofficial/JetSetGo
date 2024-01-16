import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.npoint.io',
});

export const getFlightsData = () => API.get('/4829d4ab0e96bfab50e7');
