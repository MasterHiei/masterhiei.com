import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from 'store';
import { Article } from 'models/article';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

// Name
export const name = 'article';

// Get page limit from environment variables
const limit = Number(process.env.PAGE_LIMIT);

// Types declaration
const types = {
  SET_PAGE: 'SET_PAGE',
  FETCH: 'FETCH',
  FETCH_ONE_BY_ID: 'FETCH_ONE_BY_ID',
};

interface State {
  page: number;
  articles: Article[];
}

interface Actions<S, R> extends ActionTree<S, R> {
  fetch(context: ActionContext<S, R>, page: number): Promise<boolean>;
  fetchOneById(context: ActionContext<S, R>, id: string): Promise<void>;
}

// State
export const state = (): State => ({
  page: 1,
  articles: [],
});

// Getters
export const getters: GetterTree<State, RootState> = {
  /**
   * Find an Article by ID
   */
  findOneById: (state): ((id: string) => Article | undefined) => (
    id: string
  ): Article | undefined =>
    state.articles.find((article): boolean => article.id === id),
};

// Actions
export const actions: Actions<State, RootState> = {
  /**
   * Fetch article data
   * @param context Vuex action context
   * @param page Number of page
   */
  async fetch({ commit }, page): Promise<boolean> {
    const $axios = this.$axios as NuxtAxiosInstance;
    const params = {
      page: page,
      limit: limit,
    };
    const { data } = await $axios.$get('/articles', { params: params });
    if (data != null && data.length > 0) {
      commit(types.SET_PAGE, page);
      commit(types.FETCH, data);
      return true;
    }
    return false;
  },

  /**
   * Fetch an article data by ID
   * @param context Vuex action context
   * @param id Article ID
   */
  async fetchOneById({ commit }, id): Promise<void> {
    const $axios = this.$axios as NuxtAxiosInstance;
    const { data } = await $axios.$get(`/articles/${id}`);
    commit(types.FETCH_ONE_BY_ID, data);
  },
};

// Mutations
export const mutations: MutationTree<State> = {
  /**
   * Set page number of articles
   * @param state State of Article store
   * @param page Page number
   */
  [types.SET_PAGE](state, page: number): void {
    state.page = page;
  },

  /**
   * Fetch articles state
   * @param state State of Article store
   * @param articles Articles
   */
  [types.FETCH](state, articles: Article[]): void {
    if (state.page === 1) {
      state.articles = articles;
      return;
    }

    let start = limit * (state.page - 1);
    for (let i = 0; i < articles.length; i++) {
      state.articles[start] = articles[i];
      start += 1;
    }
  },

  /**
   * Fetch an article state
   * @param state State of Article store
   * @param article Article
   */
  [types.FETCH_ONE_BY_ID](state, article: Article): void {
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
