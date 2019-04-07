import Vue from 'vue';
import VueI18n, { IVueI18n } from 'vue-i18n';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Auth } from './auth';

interface TheConfirmInstance extends Vue {
  show: (
    message: string | VueI18n.TranslateResult,
    title?: string
  ) => Promise<boolean>;
}

interface NuxtI18nInterface {
  beforeLanguageSwitch: (oldLocale: string, newLocale: string) => void;
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $i18n: VueI18n & IVueI18n;
    i18n: VueI18n & IVueI18n & NuxtI18nInterface;
    $axios: NuxtAxiosInstance;
    readonly $auth: Auth;
  }
}
