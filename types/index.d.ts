import Vue from 'vue';
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
  }
}

declare global {
  namespace Express {
    export interface Request {
      token?: string;
    }
  }
}
