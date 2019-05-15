<template lang="pug">
  v-layout(justify-center wrap)
    // Chart
    v-flex(tag="section" md6 xs11 wrap)
      v-card(class="chart-card")
        v-flex(class="chart-card-title" wrap)
          | Title

        the-pie(:data="tags")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {
    ThePie: () => import('@/components/chart/ThePie.vue'),
  },

  async asyncData({ $axios }) {
    const tags = await $axios.$get('/tags');
    return { tags };
  },
})
export default class TagsPage extends Vue {
  // Data
  tags = [];
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.chart-card
  padding 30px
  &-title
    font-size 24px
    font-weight 700
    text-align center
    margin-bottom 8px
</style>
