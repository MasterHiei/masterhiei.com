import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { Article } from '@/models/index';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

// Namespace
export const name = 'article';
export const namespaced = true;

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
  fetchAll(context: ActionContext<S, R>): void;
  fetchOneById(context: ActionContext<S, R>, id: string): void;
}

export const actions: Actions<State, RootState> = {
  async fetchAll({ commit }): Promise<void> {
    const $axios = this.$axios as NuxtAxiosInstance;
    const { data } = await $axios.$get('/articles');
    commit(types.SET, data);
  },

  async fetchOneById({ commit }, id): Promise<void> {
    const $axios = this.$axios as NuxtAxiosInstance;
    const { data } = await $axios.$get(`/articles/${id}`);
    commit(types.SET_ONE_BY_ID, data);
  },
};

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
