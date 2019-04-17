<template>
  <v-layout column wrap>
    <v-flex
      v-for="(article, index) in articles"
      :id="article.id"
      :key="index"
      wrap
    >
      <article-list-item class="mb-4" :article="article" />
    </v-flex>
  </v-layout>
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
