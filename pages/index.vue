<template>
  <div>
    <article-list
      :articles="articles"
      :count="count"
    />
  </div>
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
    })
  },
}
</script>
