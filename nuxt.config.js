const pkg = require('./package');
const { app } = require(`./server/env/${process.env.NODE_ENV}`);

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
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
          'https://fonts.googleapis.com/css?family=Noto+Sans+SC:300,500,700&amp;subset=chinese-simplified,japanese',
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
        integers:
          'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr',
        crossOrigin: 'anonymous',
      },
    ],
  },

  /*
   ** Enviroment variables
   */
  env: app,

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Global CSS
   */
  css: ['~assets/style/app'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/vuetify', '~plugins/vueScrollTo', '~plugins/veeValidate'],

  generate: {
    routers: ['/about', '/ja/about'],
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'zh_CN',
            name: '简体中文',
            iso: 'zh_CN',
          },
          {
            code: 'ja',
            name: '日本語',
            iso: 'ja-JP',
          },
        ],
        defaultLocale: 'zh_CN',
        vueI18n: {
          fallbackLocale: 'zh_CN',
          messages: {
            zh_CN: require('./assets/locales/zh_CN.json'),
            ja: require('./assets/locales/ja.json'),
          },
        },
      },
    ],
  ],

  /*
   ** Nuxt Auth modules
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `${app.protocol}://${app.host}:${app.port}${
              app.api_prefix
            }/login`,
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: `${app.protocol}://${app.host}:${app.port}${
              app.api_prefix
            }/logout`,
            method: 'post',
          },
          user: {
            url: `${app.protocol}://${app.host}:${app.port}${
              app.api_prefix
            }/users/me`,
            method: 'get',
            propertyName: 'user',
          },
        },
      },
    },
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
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
    analyze: {
      analyzerMode: 'server',
    },
  },
};
