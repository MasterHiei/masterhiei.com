<template lang="pug">
  v-layout(justify-center wrap)
    v-flex(md6 pa-3 wrap)
      // Article
      v-card(class="post" tag="article")
        // Image
        v-card-title(
          class="post-image pa-0"
        )
          img(:src="article.image" :alt="article.title")

        // Content
        v-card-text(class="post-content text-xs-center")
          // Header
          v-flex(tag="header" wrap)
            // Tags
            v-flex(class="post-tag" wrap)
              n-link(
                v-for="(tag, index) in article.tags"
                :key="index"
                :to="localePath({ name: 'tags-tag', params: { tag: tag } })"
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

            // Detail
            v-flex(
              class="post-detail"
            )
              // Views
              span(class="detail-item")
                v-icon(small)
                  | far fa-eye
                | {{ $t('article.views', { number: article.views }) }}

              // Comments
              a(class="detail-item" href="#comments")
                v-icon(small)
                  | far fa-comments
                | {{ $t('article.comments', { number: commentCount }) }}

              // Stars
              span(class="detail-item")
                v-icon(small)
                  | far fa-heart
                | {{ $t('article.stars', { number: article.stars }) }}

          // Text
          v-flex(v-html="sanitizedHTML" class="post-text" wrap)

          // TODO: Footer
          v-flex(tag="footer" pa-2 style="display: none;")
            // Star
            v-flex(wrap)
              v-tooltip(top)
                template(#activator="{ on }")
                  v-btn(v-on="on" icon)
                    v-icon(color="accent" small)
                      | fas fa-heart
                span {{ $t('tooltip.star') }}

            // Social

      // Gitalk
      the-gitalk(:articleId="article.id")

    // TODO: Sidebar
    v-flex(md2 pa-3 wrap)
      v-card
        | adasdasd
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';
import { AxiosError } from 'axios';
import * as article from '@/store/article';
import * as issue from '@/store/issue';
import { Article as ArticleModel } from '@/models/article';
import sanitizeHTML from '@/common/sanitizer';

// Vuex module
const Article = namespace(article.name);
const Issue = namespace(issue.name);

@Component({
  components: {
    PostDateTime: () => import('@/components/article/Datetime.vue'),
    TheGitalk: () => import('@/components/comment/TheGitalk.vue'),
  },

  // Hooks
  async fetch({ store, params, error }) {
    // Dispatch Vuex action to query api
    await Promise.all([
      store.dispatch('article/fetchOneById', params.id),
      store.dispatch('issue/fetchOneById', params.id),
    ]).catch((e: AxiosError) => {
      const statusCode = e.response ? e.response.status : 500;
      error({ statusCode: statusCode, message: e.message });
    });
  },

  // Transition animation
  transition: {
    enterActiveClass: 'animated slideInLeft',
    leaveActiveClass: 'animated slideOutRight',
  },
})
export default class ArticlePage extends Vue {
  // Computed
  @Article.Getter('findOneById') findArticleById;
  @Issue.Getter('findOneById') findIssueById;

  /**
   * Get article data from Vuex store
   */
  get article(): ArticleModel {
    return this.findArticleById(this.$route.params.id);
  }

  /**
   * Get comments number from Vuex store
   */
  get commentCount(): number {
    const issue = this.findIssueById(this.$route.params.id);
    if (issue == null) {
      return 0;
    }
    return issue.comments;
  }

  /**
   * Sanitize HTML string
   */
  get sanitizedHTML(): string {
    const md = this.$md.render(this.article.content);
    return sanitizeHTML(md);
  }

  // SEO
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.content.slice(0, 300),
        },
      ],
    };
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.post
  margin-bottom 50px
  // Link
  a
    &:hover
      text-decoration underline

  // Image
  &-image
    img
      height auto
      width 100%

  // Content
  &-content
    padding 40px 50px

  // Tag
  &-tag
    font-size 11px
    margin-bottom 26px
    a
      margin-right 4px
      color var(--v-secondary-darken2)

  // Title
  &-title
    position relative
    margin-bottom 25px
    &>>>time
      position absolute
      top -10px
      left -60px

  // Detail
  &-detail
    font-size 13px
    .detail-item
      color var(--v-secondary-darken2)
      margin-right 20px
      &:last-child
        margin-right 0
      .v-icon
        display inline-block
        margin 0 6px 4px 0
        color var(--v-secondary-darken2)

  // Text
  &-text
    margin-top 40px
</style>
