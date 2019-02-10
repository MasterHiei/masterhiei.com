import ajax from './ajax/index';

const URL_ARTICLES = '/articles';

/**
 * Get All Articles
 * @param {Object} data queries object
 * @returns {Promise} Articles
 */
const getArticles = (data = {}) => {
  return ajax.get(URL_ARTICLES, data);
};

export { getArticles };
