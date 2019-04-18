<template lang="pug">
  v-container(pa-0 text-xs-center grid-list-xs)
    v-flex(
      tag="h1"
      class="headline font-weight-bold grey--text text--darken-2"
      mb-3
    )
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
