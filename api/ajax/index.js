import axios from '@/plugins/axios';

// handling response
axios.interceptors.response.use(res => res.data);

// Axios request encapsulation
export default {
  get: (url, data = {}) => {
    const queryStr = createQueryString(url, data);
    return axios.get(queryStr);
  },
  post: (url, data) => {
    return axios.post(url, data);
  },
};

/**
 * Create GET query string
 * @param {String} url API URL
 * @param {Object} data Queries Object
 * @returns {String} Query String
 */
const createQueryString = (url, data) => {
  let queryStr = url;
  let query = [];
  Object.keys(data).forEach(key => {
    query.push(key + '=' + data[key]);
  });
  if (query.length > 0) {
    queryStr += '?' + query.join('&');
  }
  return queryStr;
};
