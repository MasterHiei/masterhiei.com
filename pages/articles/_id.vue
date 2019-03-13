<template>
  <v-flex md8 offset-md2 xs10 offset-xs1>
    <v-btn
      v-if="this.$auth.hasScope('admin')"
      color="success"
      :to="localePath({ name: 'articles-edit-id', params: { id: article.id } })"
      nuxt
      exact
    >
      Edit
    </v-btn>

    <v-flex class="headline font-weight-bold" pt-4 pb-1 wrap>
      {{ article.title }}
    </v-flex>

    <v-flex py-2 wrap>
      {{ article.created_at | dateFormat }}
    </v-flex>

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
