import Vue from 'vue';
import { format } from 'date-fns';

Vue.filter('dateFormat', (date, formatStr = 'YYYY-MM-DD') =>
  format(date, formatStr)
);
