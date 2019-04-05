import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';

// Namespace
export const name = 'article';
export const namespaced = true;

// Mutation types
export const types = {
  SET: 'SET',
  SET_ONE_BY_ID: 'SET_ONE_BY_ID',
};

// Definition
export interface Article {
  id: string;
  category: string;
  tags: string[];
  title: string;
  content: string;
  views: number;
  stars: number;
  created_at: string;
  updated_at: string;
  modified_at: string;
}

export interface RootState {
  rootState: State;
}

export interface State {
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
  ): Article | undefined => {
    return state.articles.find((article): boolean => article.id === id);
  },
};

// Actions
export interface Actions<S, R> extends ActionTree<S, R> {
  find(context: ActionContext<S, R>): void;
  findOneById(context: ActionContext<S, R>, id: string): void;
}

export const actions: Actions<State, RootState> = {
  async find({ commit }): Promise<void> {
    const { data } = await this.$axios['$get']('/articles');
    commit(types.SET, data);
  },

  async findOneById({ commit }, id): Promise<void> {
    const { data } = await this.$axios['$get'](`/articles/${id}`);
    commit(types.SET_ONE_BY_ID, data);
  },
};

export const mutations: MutationTree<State> = {
  [types.SET](state, articles: Article[]): void {
    state.articles = articles;
  },

  [types.SET_ONE_BY_ID](state, article: Article): void {
    let isExist = false;
    const articles = state.articles;
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
