import { SET_ARTICLES } from "./mutation-types"
import { getArticles } from "../api/index"

// States
export const state = () => ({
  articles: []
})

// Getters
export const getters = {
  count(state) {
    return state.articles.length || 0
  },
  all(state) {
    return state.articles || []
  }
}

// Mutations
export const mutations = {
  [SET_ARTICLES](state, articles) {
    state.articles = articles
  }
}

// Actions
export const actions = {
  async getArticles({ commit }) {
    const articles = await getArticles()
    commit("SET_ARTICLES", articles)
  }
}
