<template>
  <the-editor :content="content" />
</template>

<script>
import { mapGetters } from 'vuex';
import TheEditor from '@/components/TheEditor';

export default {
  components: {
    TheEditor,
  },

  computed: {
    ...mapGetters({
      getArticleById: 'article/getArticleById',
    }),

    content() {
      const article = this.getArticleById(this.$route.params.id);
      return article.content;
    },
  },
};
</script>
