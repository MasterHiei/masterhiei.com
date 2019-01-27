<template>
  <div>
    {{ articles }}
    {{ count }}
  </div>
</template>

<script>
import {mapGetters } from 'vuex'

export default {
  async fetch ({store}) {
    await store.dispatch('articles/getArticles')
  },
  computed: {
    ...mapGetters({
      articles: 'articles/all',
      count: 'articles/count',
    })
  },
}
</script>
