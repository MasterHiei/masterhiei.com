export default (isHMR, app, store, route, params, error, redirect) => {
  if (isHMR) {
    return
  }
  else if (!params.lang) {
    return redirect('/ja-JP'+route.fullPath)
  }
  const locale = params.lang || 'ja-JP'
  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale
}
