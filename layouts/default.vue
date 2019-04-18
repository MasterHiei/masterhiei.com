<template lang="pug">
  v-app
    the-header

    v-content(style="background-color: #E0E0E0;")
      nuxt

    the-footer

    the-scroll-to-btn(:show="didScroll")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    TheHeader: () => import('@/components/layout/TheHeader.vue'),
    TheFooter: () => import('@/components/layout/TheFooter.vue'),
    TheScrollToBtn: () => import('@/components/ui/TheScrollToBtn.vue'),
  },
})
export default class DefaultLayout extends Vue {
  // Data
  didScroll = false;

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
    this.didScroll = scrollOffset > 80;
  }
}
</script>
