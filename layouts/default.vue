<template lang="pug">
  v-app
    the-header(ref="header")

    v-content
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

  // Computed
  get headerHeight(): number {
    const header = this.$refs.header as Vue;
    return header.$el.clientHeight;
  }

  // Methods
  scrollListener() {
    const scrollOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    this.didScroll = scrollOffset > this.headerHeight;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.v-content
  background-color var(--v-secondary-lighten1)
</style>
