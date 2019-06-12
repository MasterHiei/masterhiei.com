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
    v-infinite-loading(:infinite="fetchArticles")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Article } from '@/models/article';
import { StateChanger } from 'vue-infinite-loading';

@Component({
  components: {
    ArticleListItem: () => import('@/components/article/ListItem.vue'),
    VInfiniteLoading: () => import('@/components/util/VInfiniteLoading.vue'),
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
  +breakpoints(md)
    justify-content center
  // Item
  &-item
    padding 0 8px
    margin-bottom 40px
    +breakpoints(sm)
      padding 0
</style>
