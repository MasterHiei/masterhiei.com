import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from 'store';
import axios from '@/api/axios/github';
import { Issue, Label } from '@/models/issue';
import { generateId } from '@/utils/gitalk';

// Get environment variables
const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const owner = process.env.GITHUB_OWNER;
const repo = process.env.COMMENTS_PEPO;
const label = process.env.COMMENTS_LABEL;

/**
 * Deconstruct issue from API response
 * @param data Issue in API response
 */
const deconstructIssue = (data: any): Issue => {
  // Extract labels
  const labels: Label[] = [];
  data.labels.forEach((item): void => {
    // Jump to next loop if label name is 'Comment' label name
    if (item.name === label) {
      return;
    }

    labels.push({ id: item.id, name: item.name });
  });

  // Remake issue
  const issue: Issue = {
    id: data.id,
    labels,
    comments: data.comments,
  };

  return issue;
};

/** Mutation types */
const types = {
  FETCH: 'FETCH',
  FETCH_ONE: 'FETCH_ONE',
};

/**
 * States of issue store declaration
 * @interface State
 */
interface State {
  /** GitHub issues */
  issues: Issue[];
}

/**
 * Actions of issue store declaration
 * @interface Actions
 * @extends ActionTree
 */
interface Actions<S, R> extends ActionTree<S, R> {
  /**
   * Fetch issue data
   * @param context Vuex action context
   */
  fetch(context: ActionContext<S, R>, page: number): Promise<void>;

  /**
   * Fetch an issue data by ID
   * @param context Vuex action context
   * @param id Gitalk ID
   */
  fetchOneById(context: ActionContext<S, R>, id: string): Promise<void>;
}

/** Store namespace */
export const name = 'issue';

/** Default value of issue sates */
export const state = (): State => ({
  issues: [],
});

/**
 * Issue store getters
 * @implements GetterTree
 */
export const getters: GetterTree<State, RootState> = {
  /**
   * Find an Issue by Gitalk ID
   */
  findOneById: (state): ((id: string) => Issue | undefined) => (
    id: string
  ): Issue | undefined => {
    const gitalkId = generateId(id);
    return state.issues.find((issue): boolean => {
      const label = issue.labels.find(
        (label): boolean => label.name === gitalkId
      );
      return label != null;
    });
  },
};

/**
 * Issue store actions
 * @implements Actions
 */
export const actions: Actions<State, RootState> = {
  async fetch({ commit }): Promise<void> {
    const response = await axios.get(`/repos/${owner}/${repo}/issues`, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        labels: label,
      },
    });
    if (response != null && response.data.length > 0) {
      commit(types.FETCH, response.data);
    }
  },

  async fetchOneById({ commit }, id): Promise<void> {
    const gitalkId = generateId(id);
    const response = await axios.get(`/repos/${owner}/${repo}/issues`, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        labels: `${label},${gitalkId}`,
      },
    });
    if (response != null && response.data.length > 0) {
      commit(types.FETCH_ONE, response.data[0]);
    }
  },
};

/**
 * Issue store mutations
 * @implements MutationTree
 */
export const mutations: MutationTree<State> = {
  /**
   * Mutate issues state from API response
   * @param state State of Issue store
   * @param res API response
   */
  [types.FETCH](state, res: any[]): void {
    // Get issues from response
    const issues: Issue[] = [];
    res.forEach((item): void => {
      const issue = deconstructIssue(item);
      issues.push(issue);
    });
    state.issues = issues;
  },

  /**
   * Mutate an issue state from API response
   * @param state State of Issue store
   * @param res API response
   */
  [types.FETCH_ONE](state, res: any): void {
    // Deconstruct API response
    const issue = deconstructIssue(res);

    // Mutate state data
    const issues = state.issues;
    const index = issues.findIndex((item): boolean => item.id === issue.id);
    if (index < 0) {
      issues.push(issue);
    } else {
      issues[index] = issue;
    }
    state.issues = issues;
  },
};
