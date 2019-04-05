import Vue from 'vue';
import VueI18n, { IVueI18n } from 'vue-i18n';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

// TODO: Declare the User interface
interface User {
  id: string,
}

interface Auth {
  user: User;
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $i18n: VueI18n & IVueI18n;
    $axios: NuxtAxiosInstance,
    readonly $auth: Auth;
  }
}
