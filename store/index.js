export const state = () => ({
  locales: ['ja-JP', 'zh-CN'],
  locale: 'ja-JP'
})

export const mutations = {
  SET_LOCALE(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}
