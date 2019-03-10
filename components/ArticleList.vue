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

<script>
import { mapGetters } from 'vuex';
import ArticleListItem from './ArticleListItem';

export default {
  components: {
    ArticleListItem,
  },

  computed: {
    ...mapGetters({
      articles: 'article/all',
    }),
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.article-item-container
  border-bottom thin solid lightgray
</style>
