<template>
  <v-app>
    <the-navbar />

    <v-content>
      <nuxt />
    </v-content>

    <the-footer />

    <the-scroll-to-btn :show="pageDidScroll" />
  </v-app>
</template>

<script>
import TheNavbar from '@/components/TheNavbar';
import TheFooter from '@/components/TheFooter';
import TheScrollToBtn from '@/components/TheScrollToBtn';

export default {
  components: {
    TheNavbar,
    TheFooter,
    TheScrollToBtn,
  },
  data() {
    return {
      pageDidScroll: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.scrollListener);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollListener);
  },
  methods: {
    scrollListener() {
      const scrollOffset =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.pageDidScroll = scrollOffset > 80;
    },
  },
};
</script>
