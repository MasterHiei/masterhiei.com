<template lang="pug">
  v-layout(class="section" justify-center wrap)
    // Chart
    v-flex(
      tag="section"
      class="section-item"
      md6
      xs11
      wrap
    )
      v-card(class="tag-card")
        v-flex(class="tag-card-title" wrap)
          v-icon(size="26") fas fa-tags
          | {{ $t('tag.title') }}

      v-card(class="chart-card")
        the-bar(:data="tags")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {
    TheBar: () => import('@/components/chart/TheBar.vue'),
  },

  // Hooks
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
.section
  &-item
    margin-bottom 16px
    // Tag card
    .tag-card
      padding 30px
      margin-bottom 30px
      &-title
        font-size 28px
        font-weight 700
        text-align center
        margin-bottom 8px
        .v-icon
          color var(--v-primary-base)
          margin 0 8px 4px 0
    // Chart card
    .chart-card
      padding 30px
</style>
