<template lang="pug">
v-card(class="py-3")
  // Title
  v-card-title(class="text-xs-center")
    v-flex(tag="span" class="headline font-weight-bold")
      v-icon(class="mb-1" left) fas fa-feather-alt
      | {{ $t('article.list') }}

  // Items
  v-layout(px-3 wrap)
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
