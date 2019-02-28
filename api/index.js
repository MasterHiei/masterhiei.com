import ajax from './ajax/index';

/**
 * Get All Articles
 * @param {Object} data queries object
 * @returns {Promise} Articles
 */
const getArticles = (data = {}) => {
  return ajax.get('/articles', data);
};

/**
 * Get Article by ID
 * @param {String} id Article ID
 * @returns {Promise}
 */
const getArticle = id => {
  return ajax.get(`/articles/${id}`);
};

/**
 * Check Email is valid or not
 * @param {*} email
 */
const validateUser = email => {
  return ajax.post('/user/validate', email);
};

export { getArticles, getArticle, validateUser };
