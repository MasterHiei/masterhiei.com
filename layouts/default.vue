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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    TheNavbar: () => import('@/components/TheNavbar.vue'),
    TheFooter: () => import('@/components/TheFooter.vue'),
    TheScrollToBtn: () => import('@/components/TheScrollToBtn.vue'),
  },
})
export default class DefaultLayout extends Vue {
  // Data
  pageDidScroll = false;

  // Hooks
  mounted() {
    window.addEventListener('scroll', this.scrollListener);
  }

  destroyed() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  // Methods
  scrollListener() {
    const scrollOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    this.pageDidScroll = scrollOffset > 80;
  }
}
</script>
