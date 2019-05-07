import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';

// Obtain environment variables
const { DOMAIN } = process.env;

Vue.use(VueLazyLoad, {
  loading: `${DOMAIN}/public/loading/eclipse.svg`,
});
