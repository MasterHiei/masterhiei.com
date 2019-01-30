<template>
  <v-container
    fluid
    grid-list-sm
  >
    <v-layout
      row
    >
      <v-flex
        d-flex
        xs9
      >
        <v-layout
          column
        >
          <v-flex
            v-for="(article, index) in articles"
            :id="article._id"
            :key="index"
            d-flex
          >
            <article-list
              :article="article"
            />
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex
        d-flex
        xs3
      >
        right-side-area
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ArticleList from '~/components/articleList/articleList'

export default {
  async fetch ({store}) {
    await store.dispatch('articles/getArticles')
  },
  components: {
    ArticleList
  },
  computed: {
    ...mapGetters({
      articles: 'articles/all',
      count: 'articles/count',
    }),
  },
}
</script>
