<template>
  <the-editor :content="content" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as article from '@/store/article';

const Article = namespace(article.name);

@Component({
  components: {
    TheEditor: () => import('@/components/TheEditor.vue'),
  },

  middleware: 'auth',
})
export default class ArticleEditPage extends Vue {
  // Computed
  @Article.Getter findOneById;

  get content() {
    const article = this.findOneById({ value: this.$route.params.id });
    return article.content;
  }
}
</script>
