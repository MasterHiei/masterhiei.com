<template lang="pug">
  // Items
  v-layout(class="post-list" wrap)
    v-flex(
      v-for="(article, index) in storedArticles"
      :key="index"
      class="post-list-item"
      md6
      xs12
      wrap
    )
      article-list-item(:article="article")

    // Actions
    v-flex(
      v-show="isHaveNext"
      class="post-list-action text-xs-center"
      my-3
      wrap
    )
      v-hover
        button(
          v-show="!loading"
          slot-scope="{ hover }"
          class="fetch-button"
          :class="`elevation-${ hover ? 6 : 0 }`"
          @click="fetchNext"
        )
          v-icon(:class="{ rotate: hover }" color="accent")
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
import { Component, Vue, namespace } from 'nuxt-property-decorator';
import * as article from '@/store/article';
import { Article as ArticleModel } from '@/models/article';

const Article = namespace(article.name);

@Component({
  components: {
    ArticleListItem: () => import('./ListItem.vue'),
  },
})
export default class List extends Vue {
  // Data
  @Article.State articles;
  @Article.State page;
  @Article.State totalCount;
  loading = false;
  isHaveNext = true;

  // Coumputed
  /**
   * Watch articles
   */
  get storedArticles(): ArticleModel[] {
    return this.articles;
  }

  /**
   * Watch page number
   */
  get storedPage(): number {
    return this.page;
  }

  /**
   * Watch article count number
   */
  get storedTotalCount(): number {
    return this.totalCount;
  }

  // Methods
  @Article.Action fetch;

  /**
   * Fectch article data of the next page
   */
  async fetchNext() {
    this.loading = true;
    await this.fetch(this.storedPage + 1);
    this.loading = false;

    const isHaveNext = this.storedArticles.length < this.storedTotalCount;
    if (isHaveNext) {
      this.$forceUpdate();
    }
    this.isHaveNext = isHaveNext;
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
      transition box-shadow 0.3s
        .v-icon::before
          transition transform 0.3s
          .rotate::before
            transform rotate(90deg)

    // Icon
    .fetch-icon
      margin 18px 24px
</style>
