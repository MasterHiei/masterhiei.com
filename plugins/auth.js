export default async ({ app }) => {
  // Save social user data to database
  const socialUser = app.$auth.user;
  const strategy = app.$auth.strategy.name;
  if (strategy === 'local' || !socialUser || socialUser.isFetched) return;
  const { user } = await app.$axios.$post('/users/social', {
    type: strategy,
    socialId: socialUser.id,
    username: socialUser.name || socialUser.login,
    avatar: socialUser.avatar_url,
  });
  user.isFetched = true;
  app.$auth.$storage.setState('user', user);
};
