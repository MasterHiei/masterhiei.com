<template lang="pug">
  v-layout(justify-center wrap)
    v-flex(md5 xs12 pa-3 wrap)
      // Article
      v-card(id="article-container" tag="article")
        // Image
        v-card-title(
          class="post-image pa-0"
        )
          img(:src="article.image" :alt="article.title")

        // Content
        v-card-text(class="post-container text-xs-center")
          // Header
          v-flex(tag="header" wrap)
            // Tags
            v-flex(class="post-tags" wrap)
              a(
                v-for="(tag, index) in article.tags"
                :key="index"
                href="#"
              )
                | \#{{ tag }}

            // Title
            v-flex(
              class="post-title title font-weight-bold"
              wrap
            )
              span
                | {{ article.title }}

              // Datetime
              post-date-time(:datetime="article.created_at")

            // Info
            v-flex(
              class="post-info"
            )
              // Views
              span
                v-icon(small)
                  | far fa-eye
                | {{ $t('article.views', { number: article.views }) }}

              // Comments
              a(href="#comments")
                v-icon(small)
                  | far fa-comments
                | {{ $t('article.comments', { number: commentsCount }) }}

              // Stars
              span
                v-icon(small)
                  | far fa-heart
                | {{ $t('article.stars', { number: article.stars }) }}

          // Content
          v-flex(v-html="sanitizedHTML" class="post-content" wrap)

          // Footer
          v-flex(tag="footer" pa-2 style="display: none;")
            // TODO: Star
            v-flex(wrap)
              v-tooltip(top)
                template(#activator="{ on }")
                  v-btn(v-on="on" icon)
                    v-icon(color="accent" small)
                      | fas fa-heart
                span {{ $t('tooltip.star') }}

            // TODO: Social

      // Comment List
      v-gitalk(:articleId="article.id")

    // Sidebar
    v-flex(md2 xs12 pa-3 wrap)
      v-card
        | adasdasd
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { namespace } from 'vuex-class';
import sanitizer from '@/common/utils/sanitizer';
import * as article from '@/store/article';
import { Article as ArticleModel } from '@/models/article';

const Article = namespace(article.name);

@Component({
  components: {
    PostDateTime: () => import('@/components/article/Datetime.vue'),
    VGitalk: () => import('@/components/comment/VGitalk.vue'),
  },
})
export default class ArticlePage extends Vue {
  // Data
  commentsCount = 0;

  async fetch({ store, params }) {
    // Get article data from Vuex store
    await store.dispatch('article/fetchOneById', params.id);
  }

  // Computed
  @Article.Getter findOneById;

  /**
   * Article in vuex store
   */
  get article(): ArticleModel {
    return this.findOneById(this.$route.params.id);
  }

  /**
   * Sanitize HTML string
   */
  get sanitizedHTML(): string {
    const md = this.$md.render(this.article.content);
    return sanitizer(md);
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
a:hover
  text-decoration underline

#article-container
  margin-bottom 50px

.post-image
  &>img
    height auto
    width 100%

.post-container
  padding 40px 50px

.post-tags
  font-size 11px
  margin-bottom 26px
  &>a
    margin-right 4px
    color var(--v-secondary-darken2)

.post-title
  position relative
  margin-bottom 25px
  &>>>time
    position absolute
    top -10px
    left -60px

.post-info
  font-size 13px
  &>span, &>a
    color var(--v-secondary-darken2)
    margin-right 20px
  &>*:last-child
    margin-right 0
  &>>>.v-icon
    display inline-block
    margin 0 6px 4px 0
    color var(--v-secondary-darken2)

.post-content
  margin-top 40px

.post-footer
  &>button
    margin-right 12px
</style>
