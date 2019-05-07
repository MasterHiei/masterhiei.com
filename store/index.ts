import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';

// Interface
export interface RootState {}

// State
export const state = (): RootState => ({});

// Getters
export const getters: GetterTree<RootState, RootState> = {};

// Actions
interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>): void;
}

export const actions: Actions<RootState, RootState> = {
  async nuxtServerInit({ dispatch }): Promise<void> {
    // await dispatch('article/fetch', 1);
  },
};

// Mutations
export const mutations: MutationTree<RootState> = {};
