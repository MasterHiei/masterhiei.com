import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { forEach } from 'lodash';
import { RootState } from 'store';
import { Article } from 'models/article';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

// Get page limit from environment variables
const limit = Number(process.env.PAGE_LIMIT);

// Types declaration
const types = {
  SET_PAGE: 'SET_PAGE',
  SET_TOTAL_COUNT: 'SET_TOTAL_COUNT',
  FETCH: 'FETCH',
  FETCH_ONE: 'FETCH_ONE',
};

interface State {
  articles: Article[];
  page: number;
  totalCount: number;
}

interface Actions<S, R> extends ActionTree<S, R> {
  fetch(context: ActionContext<S, R>, page: number): Promise<void>;
  fetchOneById(context: ActionContext<S, R>, id: string): Promise<void>;
}

// Name
export const name = 'article';

// State
export const state = (): State => ({
  articles: [],
  page: 1,
  totalCount: 0,
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
   * Mutate article data
   * @param context Vuex action context
   * @param page Number of page
   */
  async fetch({ commit }, page): Promise<void> {
    const $axios = this.$axios as NuxtAxiosInstance;
    const params = {
      page: page,
      limit: limit,
    };
    const { articles, totalCount } = await $axios.$get('/articles', {
      params: params,
    });
    commit(types.SET_PAGE, page);
    commit(types.SET_TOTAL_COUNT, totalCount);
    commit(types.FETCH, articles);
  },

  /**
   * Mutate an article data by ID
   * @param context Vuex action context
   * @param id Article ID
   */
  async fetchOneById({ commit }, id): Promise<void> {
    const $axios = this.$axios as NuxtAxiosInstance;
    const { article } = await $axios.$get(`/articles/${id}`);
    commit(types.FETCH_ONE, article);
  },
};

// Mutations
export const mutations: MutationTree<State> = {
  /**
   * Set page number
   * @param state State of Article store
   * @param page Page number
   */
  [types.SET_PAGE](state, page: number): void {
    state.page = page;
  },

  /**
   * Set article count number
   * @param state State of Article store
   * @param totalCount Article count number
   */
  [types.SET_TOTAL_COUNT](state, totalCount: number): void {
    state.totalCount = totalCount;
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

    // Overwrite article data
    let start = limit * (state.page - 1);
    forEach(
      articles,
      (article): void => {
        state.articles[start] = article;
        start += 1;
      }
    );
  },

  /**
   * Fetch an article state
   * @param state State of Article store
   * @param article Article
   */
  [types.FETCH_ONE](state, article: Article): void {
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
