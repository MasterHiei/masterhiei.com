<template>
  <v-app>
    <navbar />

    <v-content>
      <nuxt />
    </v-content>

    <v-footer>
      <div>footer</div>
    </v-footer>

    <scroll-to-btn :show="pageDidScroll" />
  </v-app>
</template>

<script>
import navbar from '@/components/navbar/navbar';
import scrollToBtn from '@/components/scrollToBtn/scrollToBtn';

export default {
  components: {
    navbar,
    scrollToBtn,
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
