import Vue from 'vue';
import VueTimeago from 'vue-timeago';

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'zh_CN',
  locales: {
    zh_CN: require('date-fns/locale/zh_cn'),
    ja: require('date-fns/locale/ja'),
  },
});
