<template lang="pug">
  v-app(v-scroll="viewDidScroll")
    the-header(ref="header" :didScroll="didScroll")

    v-content
      v-layout(justify-center wrap)
        v-flex(id="content" xs11 md8 wrap)
          nuxt

    the-footer

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
  showScrollToBtn = false;
  scrollPercent = 0;

  // Computed

  /**
   * Header height
   */
  get headerHeight(): number {
    const header = this.$refs.header as Vue;
    if (header == null) return 0;
    return header.$el.clientHeight;
  }

  // Methods
  viewDidScroll() {
    const scrollOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    // Page did scroll
    this.didScroll = scrollOffset > 0;

    // Control ScrollToBtn
    this.showScrollToBtn = scrollOffset >= this.headerHeight;

    // Calculate scroll percentage
    const docHeight = document.documentElement.scrollHeight;
    const winHeight =
      window.innerHeight || document.documentElement.clientHeight;
    this.scrollPercent = (scrollOffset / (docHeight - winHeight)) * 100;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#content
  max-width 1280px

#progress-page-scroll
  position fixed
  bottom 0
</style>
