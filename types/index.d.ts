import Vue from 'vue';
import MarkdownIt from 'markdown-it';
import { Auth } from './auth';

/**
 * Extends definition in Vue.js
 */
declare module 'vue/types/vue' {
  interface Vue {
    readonly $auth: Auth;
    readonly $md: MarkdownIt;
  }
}

/**
 * Extends definition in Express
 */
declare global {
  namespace Express {
    export interface Request {
      token?: string;
    }
  }
}
