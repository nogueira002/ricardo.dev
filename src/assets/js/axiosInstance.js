import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://back-end-rose-two.vercel.app/', 

  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
