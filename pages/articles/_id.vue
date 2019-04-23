<template lang="pug">
  v-container(grid-list-xs)
    v-layout(row justify-center wrap)
      v-flex(md8 xs12 wrap)
        // TODO: Edit Button
        v-btn(
          v-if="this.$auth.hasScope('admin')"
          color="success"
          :to="localePath({ name: 'articles-edit-id', params: { id: article.id } })"
          nuxt
          extra
        )
          | Edit

        // Title
        v-flex(tag="h1" class="primary-text" pt-4)
          | {{ article.title }}

        // Detail
        v-flex(v-if="isNew" tag="span" mr-3)
          | {{ $t('article.createdDate', { date: dateFormate(article.created_at) }) }}

        v-tooltip(
          v-else
          top
          color="secondary lighten-3"
          content-class="primary--text"
          lazy
        )
          template(#activator="{ on }")
            v-flex(tag="span" mr-3 v-on="on")
              | {{ $t('article.updatedDate', { date: dateFormate(article.modified_at) }) }}
          span {{ $t('article.createdDate', { date: dateFormate(article.created_at) }) }}

        v-flex(tag="span" mr-3)
          | {{ $t('article.views', { number: article.views }) }}

        v-flex(pb-2 wrap)
          v-chip(
            v-for="(tag, index) in article.tags"
            :key="index"
            class="mr-3"
            color="secondary"
            small
          )
            | {{ tag }}

        // Contents
        template(lang="md")
          | {{ article.content }}

        // Comments
        comment-list(:comments="article.comments")

        // Poster
        comment-poster
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as article from '@/store/article';
import isEqual from 'date-fns/is_equal';

const Article = namespace(article.name);

@Component({
  components: {
    Viewer: () => import('@/components/markdown/Viewer.vue'),
    CommentList: () => import('@/components/comment/List.vue'),
    CommentPoster: () => import('@/components/comment/Poster.vue'),
  },

  async fetch({ store, params }) {
    await store.dispatch('article/fetchOneById', params.id);
  },
})
export default class ArticlePage extends Vue {
  // Computed
  @Article.Getter findOneById;

  get article() {
    return this.findOneById(this.$route.params.id);
  }

  get isNew() {
    if (!this.article.created_at || !this.article.modified_at) {
      return true;
    }
    return isEqual(this.article.created_at, this.article.modified_at);
  }

  // Methods
  dateFormate(date: string): string {
    return this.$d(new Date(date), 'short', this.$i18n.locale);
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.v-chip__content .v-icon
  margin-left -2px
</style>
