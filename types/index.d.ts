import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { Auth } from './auth';

export interface ConfirmInstance extends Vue {
  show: (
    message: string | VueI18n.TranslateResult,
    title?: string
  ) => Promise<boolean>;
}

interface MarkdownIt {
  render(md: string): string;
}

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
