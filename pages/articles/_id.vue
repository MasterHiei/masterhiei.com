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

    <v-flex class="headline font-weight-bold" tag="h1" pt-4 wrap>
      {{ article.title }}
    </v-flex>

    <v-flex class="grey--text" py-3 wrap>
      <v-flex v-if="isEqualToDate" tag="span">
        {{
          $t('article.createdDate', { date: dateFormate(article.created_at) })
        }}
      </v-flex>

      <v-flex v-else tag="span">
        {{
          $t('article.updatedDate', { date: dateFormate(article.updated_at) })
        }}
      </v-flex>
    </v-flex>

    <the-markdown-view :content="article.content" />
  </v-flex>
</template>

<script>
import isEqual from 'date-fns/is_equal';
import TheMarkdownView from '@/components/TheMarkdownView';
import { getArticle } from '@/api/index.js';

export default {
  components: {
    TheMarkdownView,
  },

  computed: {
    isEqualToDate() {
      if (!this.article.created_at || !this.article.updated_at) {
        return true;
      }
      return isEqual(this.article.created_at, this.article.updated_at);
    },
  },

  async asyncData({ store, params }) {
    const id = params.id;
    const { data } = await getArticle(id);
    store.dispatch('article/setArticle', data);
    return { article: data };
  },

  methods: {
    dateFormate(dateStr) {
      return this.$d(new Date(dateStr), 'short', this.$i18n.locale);
    },
  },
};
</script>
