import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';

// Mutation types declaration
const types = {
  OPEN_NAV_DRAWER: 'OPEN_NAV_DRAWER',
};

/**
 * Root interface of Vuex state
 * @interface RootState
 */
export interface RootState {}

/**
 * Vuex states declaration
 * @interface State
 */
interface State {
  /** Display control of mobile navigation drawer */
  showNavDrawer: boolean;
}

/**
 * Vuex actions declaration
 * @interface Actions
 * @extends ActionTree
 */
interface Actions<S, R> extends ActionTree<S, R> {
  /**
   * Fetch data on server initialization
   * @param context Vuex actions context
   */
  nuxtServerInit(context: ActionContext<S, R>): Promise<void>;
}

/** Default value of Vuex states */
export const state = (): State => ({
  showNavDrawer: false,
});

/**
 * Vuex getters
 * @implements GetterTree
 */
export const getters: GetterTree<RootState, RootState> = {};

/**
 * Vuex actions
 * @implements Actions
 */
export const actions: Actions<RootState, RootState> = {
  async nuxtServerInit({ dispatch }): Promise<void> {
    await dispatch('issue/fetch');
  },
};

/**
 * Vuex mutations
 * @implements MutationTree
 */
export const mutations: MutationTree<State> = {
  /**
   * Open navigation drawer
   * @param state Vuex state
   */
  [types.OPEN_NAV_DRAWER](state): void {
    state.showNavDrawer = !state.showNavDrawer;
  },
};
