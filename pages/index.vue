<template>
  <v-container fluid grid-list-lg>
    <v-layout justify-center row wrap>
      <v-flex lg6 sm10 xs11 offset-lg1>
        <article-list />
      </v-flex>

      <v-flex class="hidden-md-and-down" lg2 offset-lg1>
        right-side-area
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ArticleList from '~/components/articleList/articleList';

export default {
  components: {
    ArticleList,
  },
  async fetch({ store }) {
    await store.dispatch('articles/getArticles');
  },
};
</script>
