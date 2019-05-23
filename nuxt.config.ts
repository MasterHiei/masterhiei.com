import NuxtConfiguration from '@nuxt/config';
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';
import pkg from './package.json';
import env from './server/utils/envalid';
import dateTimeFormats from './client/assets/locales/dateTimeFormats';

// Load environment variables from .env file
require('dotenv').config();

// Source directory
const srcDir = 'client/';

// Nuxt configuration options
const config: NuxtConfiguration = {
  /*
   ** Headers of the page
   */
  head: {
    title: `Master Hiei's Blog`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Noto+Sans+SC:300,400,500,700&amp;subset=chinese-simplified,japanese',
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: '@/components/layout/loading.vue',

  /*
   ** Global CSS
   */
  css: ['~assets/style/app', 'animate.css/animate.min.css'],

  /**
   * Source directory
   */
  srcDir: srcDir,

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/aos', ssr: false },
    '~plugins/axios',
    '~plugins/vuetify',
    '~plugins/vueScrollTo',
    '~plugins/veeValidate',
    { src: '~plugins/vueLazyLoad', ssr: false },
  ],

  generate: {
    routes: ['/about', '/ja/about'],
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['@nuxtjs/dotenv', { path: __dirname }],
    '@nuxtjs/markdownit',
    [
      'nuxt-i18n',
      {
        vueI18n: {
          dateTimeFormats: dateTimeFormats,
          fallbackLocale: 'zh',
        },
        vueI18nLoader: true,
        locales: [
          {
            code: 'zh',
            name: '简体中文',
            iso: 'zh-CN',
            file: 'zh_CN.ts',
          },
          {
            code: 'ja',
            name: '日本語',
            iso: 'ja-JP',
            file: 'ja.ts',
          },
        ],
        defaultLocale: 'zh',
        lazy: true,
        langDir: 'assets/locales/lang/',
        parsePages: false,
        detectBrowserLanguage: {
          useCookie: false,
        },
      },
    ],
    'nuxt-device-detect',
  ],

  /*
   ** Nuxt Auth modules
   */
  auth: {
    plugins: ['~plugins/auth'],
    scopeKey: 'role',
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `/login`,
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: `/logout`,
            method: 'post',
          },
          user: {
            url: `/users/me`,
            method: 'get',
            propertyName: 'user',
          },
        },
      },

      github: {
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        scope: ['read:user'],
      },
    },
  },

  /*
   ** markdownit configuration
   */
  markdownit: {
    injected: true,
    breaks: true,
    typographer: true,
  },

  /*
   ** Build configuration
   */
  build: {
    plugins: [new VuetifyLoaderPlugin()],
    transpile: ['vuetify/lib'],
    loaders: {
      stylus: {
        import: ['~assets/style/variables'],
      },
    },
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
    analyze: {
      analyzerMode: 'server',
    },

    /*
     ** You can extend webpack config here
     */
    extend(config): void {
      // Resolve file extensions
      if (config.resolve && config.resolve.extensions) {
        config.resolve.extensions.push('.ts');
      }
    },
  },
};

export default config;
