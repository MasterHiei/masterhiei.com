import ajax from './ajax/index';

/**
 * Get All Articles
 * @param {Object} data queries object
 * @returns {Promise} Articles
 */
const getArticles = (data = {}) => {
  return ajax.get('/articles', data);
};

const getArticle = id => {
  return ajax.get('/articles' + '/' + id);
};

export { getArticles, getArticle };
