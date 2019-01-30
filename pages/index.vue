<template>
  <v-container
    fluid
    grid-list-sm
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        d-flex
        xs9
        justify-center
      >
        <article-list />
      </v-flex>

      <v-flex
        d-flex
        xs3
        justify-center
      >
        right-side-area
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ArticleList from '~/components/articleList/articleList'

export default {
  async fetch ({store}) {
    await store.dispatch('articles/getArticles')
  },
  components: {
    ArticleList
  },
}
</script>
