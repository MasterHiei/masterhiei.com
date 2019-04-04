<template>
  <v-layout column wrap>
    <v-flex
      v-for="(article, index) in articles"
      :id="article.id"
      :key="index"
      class="article-item-container"
    >
      <article-list-item :article="article" />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({
  components: {
    ArticleListItem: () => import('./ArticleListItem.vue'),
  },
})
export default class ArticleList extends Vue {
  @Getter('article/all') articles;
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.article-item-container
  border-bottom thin solid lightgray
</style>
