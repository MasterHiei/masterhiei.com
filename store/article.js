import { SET_ARTICLES, SET_ARTICLE } from './mutation-types';
import { getArticles } from '../api/index';

// States
export const state = () => ({
  articles: [],
});

// Getters
export const getters = {
  all(state) {
    return state.articles || [];
  },

  getArticleById: state => id => {
    const articles = state.articles || [];
    return articles.find(article => article.id === id) || {};
  },
};

// Mutations
export const mutations = {
  [SET_ARTICLES](state, articles) {
    state.articles = articles;
  },
  [SET_ARTICLE](state, article) {
    let isExist = false;
    let articles = state.articles;
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].id === article.id) {
        articles[i] = article;
        isExist = true;
      }
    }
    if (!isExist) {
      articles.push(article);
    }
  },
};

// Actions
export const actions = {
  async getArticles({ commit }, params = {}) {
    const { data } = await getArticles(params);
    commit('SET_ARTICLES', data);
  },
  async setArticle({ commit }, article) {
    commit('SET_ARTICLE', article);
  },
};
