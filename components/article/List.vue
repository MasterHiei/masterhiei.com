<template lang="pug">
  v-card(class="pa-4")
    v-container(pa-0 text-xs-center grid-list-xs)
      v-flex(
        tag="h1"
        class="headline font-weight-bold secondary-text"
        mb-3
      )
        v-icon(class="mr-2 mb-1" color="secondary" size="24")
          | fas fa-book
        | {{ $t('article.list') }}

      v-layout(row wrap)
        v-flex(
          v-for="(article, index) in articles"
          :id="article.id"
          :key="index"
          md6
          wrap
        )
          article-list-item(class="mb-3" :article="article")
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
  @Article.State articles;
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.v-card
  border-radius 1rem
  background-color var(--v-primary-lighten2)
</style>
