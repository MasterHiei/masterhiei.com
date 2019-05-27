<template lang="pug">
  v-flex(
    tag="section"
    class="section-item"
    md6
    wrap
  )
    // Article list
    v-layout(class="post-list" wrap)
      v-flex(
        v-for="(article, index) in articles"
        :key="index"
        class="post-list-item"
        md6
        xs11
        wrap
      )
        article-list-item(:article="article")

    // Infinite loading
    no-ssr
      infinite-loading(
        spinner="waveDots"
        @infinite="fetchArticles"
      )
        template(#no-results)
          error(:error="{ statusCode: 404, message: 'No Results.' }")
        template(#no-more)
          div
        template(#error)
          div
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Article } from '@/models/article';
import { StateChanger } from 'vue-infinite-loading';

@Component({
  components: {
    ArticleListItem: () => import('@/components/article/ListItem.vue'),
    InfiniteLoading: () => import('vue-infinite-loading'),
    Error: () => import('@/layouts/error.vue'),
  },

  // Transition animation
  transition: {
    enterActiveClass: 'animated slideInLeft',
    leaveActiveClass: 'animated slideOutRight',
  },
})
export default class TagPage extends Vue {
  // Data
  page = 1;
  articles: Article[] = [];

  // Methods

  /**
   * Fetch articles by tag
   */
  async fetchArticles($state: StateChanger): Promise<void> {
    const { articles } = await this.$axios.$get(
      `tags/${this.$route.params.tag}`,
      {
        params: {
          page: this.page,
          limit: process.env.PAGE_LIMIT,
        },
      }
    );
    if (articles != null && articles.length > 0) {
      this.page += 1;
      this.articles.push(...articles);
      $state.loaded();
    } else {
      $state.complete();
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.section-item
  margin: 48px auto 24px auto
.post-list
  @media (max-width $grid-breakpoints.md)
    justify-content center
  // Item
  &-item
    padding 0 8px
    margin-bottom 25px
    @media (max-width $grid-breakpoints.sm)
      padding 0
  // Infinite loading
  .infinite-loading-container
    margin-top 16px
</style>
