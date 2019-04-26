import Vue from 'vue';
import LRU from 'lru-cache';
import Vuetify, { VuetifyOptions, VuetifyTheme } from 'vuetify';

// Theme
const theme: Partial<VuetifyTheme> = {
  primary: '#3D4451',
  secondary: '#D7D7D7',
  accent: '#E8676B',
};

// Options
const options: VuetifyOptions = {
  minifyTheme: (css): string => {
    return process.env.NODE_ENV === 'production'
      ? css.replace(/[\s|\r\n|\r|\n]/g, '')
      : css;
  },
  themeCache: new LRU({
    max: 10,
    maxAge: 1000 * 60 * 60,
  }),
  customProperties: true,
  cspNonce: 'nonce-Q1veajC7P6p',
};

// Use Vuetify
Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: theme,
  options: options,
});
