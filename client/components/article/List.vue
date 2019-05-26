<template lang="pug">
  // Items
  v-layout(class="post-list" wrap)
    v-flex(
      v-for="(article, index) in articles"
      :key="index"
      class="post-list-item"
      md6
      wrap
    )
      article-list-item(:article="article")

    // Actions
    v-flex(
      v-show="isHaveMore"
      class="post-list-action text-xs-center"
      my-3
      wrap
    )
      button(
        v-show="!loading"
        class="fetch-button"
        @click="fetchNext"
      )
        v-icon(color="accent")
          | fas fa-plus

      v-icon(
        v-show="loading"
        class="fetch-icon"
        color="accent"
        size="48"
      )
        | far fa-snowflake fa-spin
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '@/models/article';

@Component({
  components: {
    ArticleListItem: () => import('./ListItem.vue'),
  },
})
export default class List extends Vue {
  // Props
  @Prop({ type: Array, required: true }) readonly initData!: Article[];
  @Prop({ type: Number, required: true }) readonly initCount!: number;

  // Data
  articles = this.initData;
  totalCount = this.initCount;
  page = 1;
  loading = false;

  // Computed

  /**
   * Returns true if have data can be fetched
   */
  get isHaveMore(): boolean {
    return this.articles.length < this.totalCount;
  }

  // Methods

  /**
   * Fetch next page article data
   */
  async fetchNext() {
    this.loading = true;
    this.page += 1;
    const { articles, totalCount } = await this.$axios.$get('/articles', {
      params: { page: this.page, limit: process.env.PAGE_LIMIT },
    });
    const data = articles || [];
    this.articles.push(...data);
    this.totalCount = totalCount;
    this.loading = false;

    if (this.isHaveMore) {
      this.$forceUpdate();
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.post-list
  // Item
  &-item
    padding 0 8px
    margin-bottom 25px
    @media (max-width $grid-breakpoints.sm)
      padding 0

  // Actions
  &-action
    // Button
    .fetch-button
      margin 12px 0
      width 97px
      height 60px
      border 1px solid var(--v-secondary-darken1)
      outline none
      background transparent
      transition box-shadow .3s
      .v-icon::before
        transition transform .3s
      &:hover
        box-shadow 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15)
        .v-icon::before
          transform rotate(90deg)

    // Icon
    .fetch-icon
      margin 18px 24px
</style>
