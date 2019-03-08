<template>
  <v-container fluid grid-list-lg>
    <v-layout justify-center row pt-3 wrap>
      <v-flex lg5 sm10 xs11>
        <article-list />
      </v-flex>

      <v-flex class="hidden-md-and-down text-xs-center" lg2>
        right-side-area
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ArticleList from '~/components/ArticleList';

export default {
  components: {
    ArticleList,
  },
  async fetch({ store }) {
    await store.dispatch('article/getArticles');
  },
};
</script>
