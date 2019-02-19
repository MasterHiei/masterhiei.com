import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo, {
  duration: 750,
  easing: 'ease-in',
  onStart: false,
  onDone: false,
  onCancel: false,
});
