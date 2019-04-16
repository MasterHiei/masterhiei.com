import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';

// Obtain environment variables
const { DOMAIN } = process.env;

Vue.use(VueLazyLoad, {
  attempt: 1,
  error: `${DOMAIN}/public/avatar/avatar.png`,
  loading: `${DOMAIN}/public/loading.svg`,
});
