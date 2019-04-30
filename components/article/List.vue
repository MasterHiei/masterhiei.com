<template lang="pug">
v-card(class="py-2 px-4" flat)
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
      v-for="(article, index) in articles"
      :key="index"
      md6
      xs12
      pa-3
      wrap
    )
      article-list-item(:article="article")
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
.section-title
  font-size 30px
</style>
