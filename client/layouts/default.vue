<template lang="pug">
  v-app(
    v-scroll="onScrollOrResize"
    v-resize="onScrollOrResize"
  )
    // Header
    the-header(:didScroll="didScroll")

    // Body
    v-content
      nuxt

    // Footer
    the-footer

    // Scroll progess linear
    v-progress-linear(
      v-model="scrollPercent"
      id="progress-page-scroll"
      class="ma-0"
      height="4"
      color="accent"
      background-color="transparent"
    )

    the-scroll-to-btn(:show="showScrollToBtn")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {
    TheHeader: () => import('@/components/layout/TheHeader.vue'),
    TheFooter: () => import('@/components/layout/TheFooter.vue'),
    TheScrollToBtn: () => import('@/components/layout/TheScrollToBtn.vue'),
  },
})
export default class DefaultLayout extends Vue {
  // Data
  didScroll = false;
  showScrollToBtn = false;
  scrollPercent = 0;

  // Methods

  /**
   * Trigger event on page scroll
   */
  onScrollOrResize() {
    const scrollOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    // Page did scroll
    this.didScroll = scrollOffset > 0;

    // Control ScrollToBtn
    this.showScrollToBtn = scrollOffset >= 60;

    // Calculate scroll percentage
    const docHeight = document.documentElement.scrollHeight;
    const winHeight =
      window.innerHeight || document.documentElement.clientHeight;
    this.scrollPercent = Math.floor(
      (scrollOffset / (docHeight - winHeight)) * 100
    );
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#progress-page-scroll
  position fixed
  bottom 0
</style>
