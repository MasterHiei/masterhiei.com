import Vue from 'vue';
import MarkdownIt from 'markdown-it';

/**
 * Extends definition in Vue.js
 */
declare module 'vue/types/vue' {
  interface Vue {
    readonly $md: MarkdownIt;
  }
}
