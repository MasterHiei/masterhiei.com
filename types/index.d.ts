import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { DollarApollo } from './vue-apollo';
import { Auth } from './auth';

interface MarkdownIt {
  render(md: string): string;
}

/**
 * Extends interfaces in Vue.js
 */
declare module 'vue/types/vue' {
  interface Vue {
    readonly $auth: Auth;
    readonly $md: MarkdownIt;
    readonly $apollo: DollarApollo<any>;
    $apolloHelpers: {
      onLogin(
        token: string,
        apolloClient?: ApolloClient<{}>,
        tokenExpires?: number
      ): Promise<void>;
      onLogout(apolloClient?: ApolloClient<{}>): Promise<void>;
      getToken(tokenName?: string): string;
    };
  }
}

declare global {
  namespace Express {
    export interface Request {
      token?: string;
    }
  }
}
