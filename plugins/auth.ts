import { Context } from '@nuxt/vue-app';
import { GithubUser } from '~/models';

export default async ({ app }: Context): Promise<void> => {
  // Save social user data to database
  const githubUser = app.$auth.user as (GithubUser | null);
  const strategy = app.$auth.strategy.name;
  if (strategy === 'local' || githubUser == null || githubUser.isFetched) {
    return;
  }
  const { user } = await app.$axios.$post('/users/social', {
    type: strategy,
    socialId: githubUser.id,
    username: githubUser.name || githubUser.login,
    avatar: githubUser.avatar_url,
  });
  user.isFetched = true;
  app.$auth.$storage.setState('user', user);
};
