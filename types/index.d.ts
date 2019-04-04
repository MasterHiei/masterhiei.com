import Vue from 'vue';

declare module 'vue/types/vue' {
  // Declare augmentation for Vue
  interface Vue {
    $i18n: Record<string, string>;
  }
}
