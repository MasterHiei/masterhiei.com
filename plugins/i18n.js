import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default (app) => {
  app.i18n = new VueI18n ({
    locale: app.store.state.locale,
    fallbackLocale: app.store.state.locale || 'ja-JP',
    messages: {
      'ja-JP': require('~/locales/ja-JP.json'),
      'zh-CN': require('~/locales/zh-CN.json')
    }
  })
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }
    return `/${app.i18n.locale}/${link}`
  }
}
