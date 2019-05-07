<template>
  <markdown-editor :content="content" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { namespace } from 'vuex-class';
import * as article from '@/store/article';

const Article = namespace(article.name);

@Component({
  components: {
    MarkdownEditor: () => import('@/components/markdown/Editor.vue'),
  },

  middleware: 'auth',
})
export default class ArticleEditPage extends Vue {
  // Computed
  @Article.Getter findOneById;

  get content() {
    const article = this.findOneById(this.$route.params.id);
    return article.content;
  }
}
</script>
