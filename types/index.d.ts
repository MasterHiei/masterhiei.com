import Vue from 'vue';
import MarkdownIt from 'markdown-it';

/**
 * Interface of highlight.js
 * @interface HighlightJS
 */
declare interface HighlightJS {
  highlightBlock: (block: Node) => void;
}

/**
 * Extends definition in Vue.js
 */
declare module 'vue/types/vue' {
  interface Vue {
    readonly $md: MarkdownIt;
    readonly $hljs: HighlightJS;
  }
}
