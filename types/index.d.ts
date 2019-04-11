import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { Auth } from './auth';

declare global {
  namespace Express {
    export interface Request {
      token?: string;
    }
  }
}

export interface TheConfirmInstance extends Vue {
  show: (
    message: string | VueI18n.TranslateResult,
    title?: string
  ) => Promise<boolean>;
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $auth: Auth;
  }
}
