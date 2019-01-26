<template>
  <div>
    <no-ssr>
      {{ articles }}
    </no-ssr>
  </div>
</template>

<script>
import { getArticles } from '~/api/index.js'

export default {
  async asyncData () {
    const data = await getArticles()
    return { articles: data }
  }
}
</script>
