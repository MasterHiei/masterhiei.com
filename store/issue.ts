import Axios from 'axios';
import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { forEach } from 'lodash';
import { RootState } from 'store';
import { Issue, Label } from '@/models/issue';
import { generateId } from '@/common/gitalk';

// Instance of axios
const axios = Axios.create({
  baseURL: 'https://api.github.com',
});

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
  forEach(
    data.labels,
    (item): void => {
      // Jump to next loop if label name is 'Comment' label name
      if (item.name === label) {
        return;
      }

      labels.push({ id: item.id, name: item.name });
    }
  );

  // Remake issue
  const issue: Issue = {
    id: data.id,
    labels: labels,
    comments: data.comments,
  };

  return issue;
};

// Types declaration
const types = {
  FETCH: 'FETCH',
  FETCH_ONE: 'FETCH_ONE',
};

interface State {
  issues: Issue[];
}

interface Actions<S, R> extends ActionTree<S, R> {
  fetch(context: ActionContext<S, R>, page: number): Promise<void>;
  fetchOneById(context: ActionContext<S, R>, id: string): Promise<void>;
}

// Name
export const name = 'issue';

// State
export const state = (): State => ({
  issues: [],
});

// Getters
export const getters: GetterTree<State, RootState> = {
  /**
   * Find an Issue by Gitalk ID
   */
  findOneById: (state): ((id: string) => Issue | undefined) => (
    id: string
  ): Issue | undefined => {
    const gitalkId = generateId(id);
    return state.issues.find(
      (issue): boolean => {
        const label = issue.labels.find(
          (label): boolean => label.name === gitalkId
        );
        return label != null;
      }
    );
  },
};

// Actions
export const actions: Actions<State, RootState> = {
  /**
   * Fetch issue data
   * @param context Vuex action context
   */
  async fetch({ commit }): Promise<void> {
    const { data } = await axios.get(`/repos/${owner}/${repo}/issues`, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        labels: label,
      },
    });
    commit(types.FETCH, data);
  },

  /**
   * Fetch an issue data by ID
   * @param context Vuex action context
   * @param id Gitalk ID
   */
  async fetchOneById({ commit }, id): Promise<void> {
    const gitalkId = generateId(id);
    const { data } = await axios.get(`/repos/${owner}/${repo}/issues`, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        labels: `${label},${gitalkId}`,
      },
    });
    if (data != null && data.length > 0) {
      commit(types.FETCH_ONE, data[0]);
    }
  },
};

// Mutations
export const mutations: MutationTree<State> = {
  /**
   * Mutate issues state from API response
   * @param state State of Issue store
   * @param res API response
   */
  [types.FETCH](state, res: any[]): void {
    // Get issues from response
    const issues: Issue[] = [];
    forEach(
      res,
      (item): void => {
        const issue = deconstructIssue(item);
        issues.push(issue);
      }
    );
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
