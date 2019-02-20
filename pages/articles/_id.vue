<template>
  <div>
    {{ article }}
  </div>
</template>

<script>
import { getArticle } from '@/api/index.js';

export default {
  async asyncData({ store, params }) {
    const id = params.id;
    const article = await getArticle(id);
    console.log(article);

    store.dispatch('articles/setArticle', article);
    return { article };
  },
};
</script>
