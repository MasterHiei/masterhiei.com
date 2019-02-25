import axios from '@/plugins/axios';

// handling request
axios.interceptors.request.use(config => {
  // TODO: Do something if need
  return config;
});

// handling response
axios.interceptors.response.use(
  res => {
    const data = res.data;
    if (data.code === 0) {
      return data.data;
    } else {
      return Promise.reject(data.code);
    }
  },
  err => {
    console.log(err);
    return Promise.reject(404);
  }
);

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
