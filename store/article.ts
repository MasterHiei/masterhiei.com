import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { Article } from '@/models/index';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

// Namespace
export const name = 'article';
export const namespaced = true;

// Page limit
const limit = process.env.PAGE_LIMIT;

// Mutation types
export const types = {
  SET: 'SET',
  SET_ONE_BY_ID: 'SET_ONE_BY_ID',
};

// Interface
interface RootState {
  rootState: State;
}

interface State {
  articles: Article[];
}

// State
export const state = (): State => ({
  articles: [],
});

// Getters
export const getters: GetterTree<State, RootState> = {
  findOneById: (state): ((id: string) => Article | undefined) => (
    id: string
  ): Article | undefined =>
    state.articles.find((article): boolean => article.id === id),
};

// Actions
interface Actions<S, R> extends ActionTree<S, R> {
  fetch(context: ActionContext<S, R>, page: number): void;
  fetchOneById(context: ActionContext<S, R>, id: string): void;
}

export const actions: Actions<State, RootState> = {
  async fetch({ commit }, page): Promise<void> {
    const $axios = this.$axios as NuxtAxiosInstance;
    const params = {
      page: page,
      limit: limit,
    };
    const { data } = await $axios.$get('/articles', { params: params });
    commit(types.SET, data);
  },

  async fetchOneById({ commit }, id): Promise<void> {
    const $axios = this.$axios as NuxtAxiosInstance;
    const { data } = await $axios.$get(`/articles/${id}`);
    commit(types.SET_ONE_BY_ID, data);
  },
};

// Mutations
export const mutations: MutationTree<State> = {
  [types.SET](state, articles: Article[]): void {
    state.articles = articles;
  },

  [types.SET_ONE_BY_ID](state, article: Article): void {
    const articles = state.articles;
    const index = articles.findIndex((item): boolean => item.id === article.id);
    if (index < 0) {
      articles.push(article);
    } else {
      articles[index] = article;
    }
    state.articles = articles;
  },
};
