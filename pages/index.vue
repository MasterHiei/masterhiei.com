<template>
  <v-container fluid grid-list-lg>
    <v-layout justify-center row wrap>
      <v-flex xs6 d-flex justify-center>
        <article-list />
      </v-flex>

      <v-flex d-flex xs1 justify-center>
        right-side-area
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ArticleList from '~/components/articleList/articleList';

export default {
  async fetch({ store }) {
    await store.dispatch('articles/getArticles');
  },
  components: {
    ArticleList,
  },
};
</script>
