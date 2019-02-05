<template>
  <v-layout column wrap>
    <v-flex
      v-for="(article, index) in articles"
      :id="article._id"
      :key="index"
      d-flex
    >
      <article-list-item :article="article" />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import articleListItem from './articleListItem'

export default {
  components: {
    articleListItem
  },
  computed: {
    ...mapGetters({
      articles: 'articles/all',
      count: 'articles/count'
    })
  }
}
</script>
