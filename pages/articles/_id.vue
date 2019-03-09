<template>
  <v-flex md8 offset-md2 xs10 offset-xs1>
    <the-markdown-view :content="article.content" />
  </v-flex>
</template>

<script>
import TheMarkdownView from '@/components/TheMarkdownView';
import { getArticle } from '@/api/index.js';

export default {
  components: {
    TheMarkdownView,
  },

  async asyncData({ store, params }) {
    const id = params.id;
    const { data } = await getArticle(id);
    store.dispatch('article/setArticle', data);
    return { article: data };
  },
};
</script>
