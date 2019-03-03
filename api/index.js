import axios from '@/plugins/axios';

// Response interceptor
axios.interceptors.response.use(res => res.data);

/**
 * Get All Articles
 * @param {Object} data queries object
 * @returns {Promise} Articles
 */
const getArticles = (data = {}) => {
  return axios.get('/articles', { params: data });
};

/**
 * Get Article by ID
 * @param {String} id Article ID
 * @returns {Promise}
 */
const getArticle = id => {
  return axios.get(`/articles/${id}`);
};

/**
 * Check Email is valid or not
 * @param {String} email
 */
const validateUser = email => {
  return axios.put('/users/validate', { email: email });
};

/**
 * Check Email is valid or not
 * @param {Object} data
 */
const register = data => {
  return axios.post('/users', data);
};

export { getArticles, getArticle, validateUser, register };
