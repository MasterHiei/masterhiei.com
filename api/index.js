import axios from '@/plugins/axios';

// Response interceptor
axios.interceptors.response.use(res => res.data);

/**
 * Get All Articles
 * @param {Object} data
 * @returns {Promise} Articles
 */
const getArticles = (data = {}) => {
  return axios.get('/articles', { params: data });
};

/**
 * Get Article by id
 * @param {String} id Article id
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
 * Register user account
 * @param {Object} data
 */
const register = data => {
  return axios.post('/users', data);
};

export { getArticles, getArticle, validateUser, register };
