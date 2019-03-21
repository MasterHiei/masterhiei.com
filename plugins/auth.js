export default ({ app }) => {
  if (!app.$auth.loggedIn || !app.$auth.user) return;

  let user = app.$auth.user;
  switch (app.$auth.strategy.name) {
    case 'github':
      user.avatar = user.avatar_url;
      user.username = user.name || user.login;
      break;
    case 'google':
      // TODO: Modify Google account info
      break;
    default:
      return;
  }
  app.$auth.$storage.setState('user', user);
};
