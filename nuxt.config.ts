import NuxtConfiguration from '@nuxt/config';
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';
import pkg from './package.json';
import env from './server/utils/envalid';
import dateTimeFormats from './assets/locales/dateTimeFormats';

// Load environment variables from .env file
require('dotenv').config();

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
        href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
        integers:
          'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf',
        crossOrigin: 'anonymous',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#43A047',
    continuous: true,
  },

  /*
   ** Global CSS
   */
  css: ['~assets/style/app'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/aos', ssr: false },
    '~plugins/vuetify',
    '~plugins/vueScrollTo',
    '~plugins/veeValidate',
    { src: '~plugins/vueLazyLoad', ssr: false },
  ],

  generate: {
    routes: ['/about', '/ja-JP/about'],
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    [
      'nuxt-i18n',
      {
        vueI18n: {
          dateTimeFormats: dateTimeFormats,
          fallbackLocale: 'zh-CN',
        },
        vueI18nLoader: true,
        locales: [
          {
            code: 'zh-CN',
            name: '简体中文',
            iso: 'zh-CN',
            file: 'zh_CN.ts',
          },
          {
            code: 'ja-JP',
            name: '日本語',
            iso: 'ja-JP',
            file: 'ja.ts',
          },
        ],
        defaultLocale: 'zh-CN',
        lazy: true,
        langDir: 'assets/locales/lang/',
        parsePages: false,
      },
    ],
    '@nuxtjs/markdownit',
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
    breaks: true,
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables'],
      },
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
