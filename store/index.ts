import { ActionTree, MutationTree, GetterTree } from 'vuex';

// Interface
export interface RootState {}

interface Actions<S, R> extends ActionTree<S, R> {}

// State
export const state = (): RootState => ({});

// Getters
export const getters: GetterTree<RootState, RootState> = {};

// Actions
export const actions: Actions<RootState, RootState> = {};

// Mutations
export const mutations: MutationTree<RootState> = {};
