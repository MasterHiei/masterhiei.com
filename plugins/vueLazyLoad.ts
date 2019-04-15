import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import env from '@/server/utils/envalid';

const { DOMAIN } = env;

Vue.use(VueLazyLoad, {
  attempt: 1,
  error: `${DOMAIN}/public/avatar/avatar.png`,
  loading: `${DOMAIN}/public/loading.svg`,
});
