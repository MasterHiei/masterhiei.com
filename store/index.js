import { SET_LOCALE } from './mutation-types'

// States
export const state = () => ({
  locales: ['ja-JP', 'zh-CN'],
  locale: 'zh-CN'
})

// Getters
export const getters = {
  isLocatedAt: (state) => (locale) => {
    return state.locale.indexOf(locale) !== -1
  }
}

// Mutations
export const mutations = {
  [SET_LOCALE] (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}

// Actions
export const actions = {
}
