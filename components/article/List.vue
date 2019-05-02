<template lang="pug">
v-card(class="pt-2 pb-3 px-4" flat)
  // Title
  v-card-title(class="text-xs-center")
    v-flex(tag="span" class="section-title font-weight-bold")
      v-icon(
        class="mb-1"
        color="primary"
        size="30"
        left
      )
        | fas fa-feather-alt
      | {{ $t('article.list') }}

  // Items
  v-layout(wrap)
    v-flex(
      v-for="(article, index) in storedArticles"
      :key="index"
      md6
      xs12
      pa-3
      wrap
    )
      article-list-item(:article="article")

  // Loader button
  v-flex(
    v-show="isHaveNext"
    class="text-xs-center"
    my-4
    wrap
  )
    v-hover(v-show="!loading")
      button(
        slot-scope="{ hover }"
        id="loader-btn"
        :class="`elevation-${ hover ? 6 : 0 }`"
        @click="fetchNext"
      )
        v-icon(:class="{ rotate: hover }" color="accent")
          | fas fa-plus

    v-icon(
      v-show="loading"
      id="loading"
      color="accent"
      size="60"
    )
      | far fa-snowflake fa-spin
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as article from '@/store/article';

const Article = namespace(article.name);

@Component({
  components: {
    ArticleListItem: () => import('./ListItem.vue'),
  },
})
export default class List extends Vue {
  // Data
  @Article.State page;
  @Article.State articles;
  loading = false;
  isHaveNext = true;

  // Coumputed
  /**
   * Watch page number
   */
  get storedPage() {
    return this.page;
  }

  /**
   * Watch article
   */
  get storedArticles() {
    return this.articles;
  }

  // Methods
  @Article.Action fetch;

  /**
   * Fectch article data of the next page
   */
  async fetchNext() {
    this.loading = true;
    const isHaveNext = await this.fetch(this.storedPage + 1);
    this.loading = false;

    if (isHaveNext) {
      this.$forceUpdate();
    }
    this.isHaveNext = isHaveNext;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.section-title
  font-size 30px

#loader-btn
  margin 12px 0
  width 97px
  height 60px
  border 1px solid var(--v-secondary-base)
  outline none
  background transparent
  transition box-shadow 0.3s
  &>>>.v-icon:before
    transition transform 0.3s

.rotate:before
    transform rotate(90deg)

#loading
  margin 12px
</style>
