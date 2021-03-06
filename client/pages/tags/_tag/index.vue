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
import { StateChanger } from 'vue-infinite-loading';
import { Article } from '@/models/article';

@Component({
  components: {
    ArticleListItem: () => import('@/components/ui/article/ListItem.vue'),
    VInfiniteLoading: () => import('@/components/ui/VInfiniteLoading.vue'),
  },

  // Transition animation
  transition: 'page',
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

  // SEO
  head() {
    return {
      title: this.$i18n.t('title.tag', { name: this.$route.params.tag }),
    };
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.section-item
  margin: 48px auto 24px auto
.post-list
  +screen-width-less-than(md)
    justify-content center
  // Item
  &-item
    padding 0 8px
    margin-bottom 40px
    +screen-width-less-than(sm)
      padding 0
</style>
