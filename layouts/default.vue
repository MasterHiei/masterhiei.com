<template lang="pug">
  v-app
    the-header(ref="header")

    v-content
      nuxt

    the-footer

    v-progress-linear(
      v-model="scrollPercent"
      class="ma-0"
      height="4"
      color="success"
      background-color="transparent"
      style="position: fixed; bottom: 0;"
    )

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
  scrollPercent = 0;

  // Hooks
  mounted() {
    window.addEventListener('scroll', this.viewDidScroll);
  }

  destroyed() {
    window.removeEventListener('scroll', this.viewDidScroll);
  }

  // Computed
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
    // Control ScrollToBtn
    this.didScroll = scrollOffset > this.headerHeight;

    // Calculate scroll percentage
    const docHeight = document.documentElement.scrollHeight;
    const winHeight =
      window.innerHeight || document.documentElement.clientHeight;
    this.scrollPercent = (scrollOffset / (docHeight - winHeight)) * 100;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.v-content
  background-color var(--v-secondary-lighten2)
</style>
