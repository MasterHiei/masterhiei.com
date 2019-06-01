import Axios from 'axios';

// Instance of axios
const axios = Axios.create({
  baseURL: 'https://api.github.com',
});

export default axios;
