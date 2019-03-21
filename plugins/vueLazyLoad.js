import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';

Vue.use(VueLazyLoad, {
  attempt: 1,
  error: `${process.env.DOMAIN}/public/avatar/avatar.png`,
  loading: `${process.env.DOMAIN}/public/loading.svg`,
});
