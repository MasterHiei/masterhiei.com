import Vue from 'vue';
import VueI18n, { IVueI18n } from 'vue-i18n';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Auth } from '@/models/index';

interface TheConfirmInstance extends Vue {
  show: (
    message: string | VueI18n.TranslateResult,
    title?: string
  ) => Promise<boolean>;
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $i18n: VueI18n & IVueI18n;
    $axios: NuxtAxiosInstance;
    readonly $auth: Auth;
  }
}
