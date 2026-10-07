import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  //withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export default axiosInstance;
