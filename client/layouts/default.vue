<template lang="pug">
  v-app
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

    // Search dialog
    the-search-dialog

    // ScrollTo button
    the-scroll-to-btn(:show="showScrollToBtn")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import throttle from 'lodash/throttle';

@Component({
  components: {
    TheHeader: () => import('@/components/layout/TheHeader.vue'),
    TheFooter: () => import('@/components/layout/TheFooter.vue'),
    TheSearchDialog: () => import('@/components/ui/TheSearchDialog.vue'),
    TheScrollToBtn: () => import('@/components/ui/TheScrollToBtn.vue'),
  },
})
export default class DefaultLayout extends Vue {
  // Data
  didScroll = false;
  showScrollToBtn = false;
  scrollPercent = 0;

  // Hooks
  mounted() {
    // Listen page scroll and resize event
    document.addEventListener(
      'scroll',
      throttle(this.didScrollOrResize, 1000 / 60),
      { passive: true }
    );
    document.addEventListener(
      'resize',
      throttle(this.didScrollOrResize, 1000 / 60),
      { passive: true }
    );

    // Trigger event one time on page load
    this.didScrollOrResize();
  }

  beforeDestroy() {
    // Remove all listener
    document.removeEventListener(
      'scroll',
      throttle(this.didScrollOrResize, 1000 / 60)
    );
    document.removeEventListener(
      'resize',
      throttle(this.didScrollOrResize, 1000 / 60)
    );
  }

  // Methods

  /**
   * Trigger event on page scroll
   */
  didScrollOrResize() {
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
