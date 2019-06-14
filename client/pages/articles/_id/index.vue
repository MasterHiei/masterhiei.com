<template lang="pug">
  v-layout(justify-center wrap)
    v-flex(md6 pa-3 wrap)
      // Article
      v-card(tag="article" class="post")
        // Image
        v-card-title.post-image.pa-0
          img(:src="article.image" :alt="article.title")

        // Content
        v-card-text(class="post-content")
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
            v-flex(class="post-title" wrap)
              span
                | {{ article.title }}

              // Datetime
              post-date-time(:datetime="article.created_at")

            // Detail
            v-flex(class="post-detail" wrap)
              // Views
              span.detail-item
                v-icon(small)
                  | far fa-eye
                | {{ $t('article.views', { number: article.views }) }}

              // Comments
              a(class="detail-item" v-scroll-to="{ el: '#comments' }")
                v-icon(small)
                  | far fa-comments
                | {{ $t('article.comments', { number: commentCount }) }}

              // Stars
              span.detail-item
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
                span star

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
import * as issue from '@/store/issue';
import { Article } from '@/models/article';
import sanitizeHTML from '@/utils/sanitizer';

// Vuex module
const Issue = namespace(issue.name);

@Component({
  components: {
    PostDateTime: () => import('@/components/article/Datetime.vue'),
    TheGitalk: () => import('@/components/comment/TheGitalk.vue'),
  },

  // Hooks
  async asyncData({ $axios, params, error }) {
    // Fetch article
    const { article } = await $axios.$get(`/articles/${params.id}`);
    if (article == null) {
      error({ statusCode: 404, message: 'Data not found.' });
    }
    return { article };
  },

  async fetch({ store, params }) {
    // Fetch issue by id
    await store.dispatch('issue/fetchOneById', params.id);
  },

  mounted() {
    this.$nextTick(() => {
      // Code highlighting
      Array.from(this.$el.querySelectorAll('pre code'), elm => {
        this.$hljs.highlightBlock(elm);
      });
    });
  },

  // Transition animation
  transition: {
    enterActiveClass: 'animated slideInLeft',
    leaveActiveClass: 'animated slideOutRight',
  },
})
export default class ArticlePage extends Vue {
  // Data
  article!: Article;

  // Computed
  @Issue.Getter('findOneById') findIssueById;

  /**
   * Get comments number from Vuex store
   */
  get commentCount(): number {
    const issue = this.findIssueById(this.$route.params.id);
    if (issue == null) {
      return 0;
    }
    return issue.comments || 0;
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
    text-align center
    a
      margin-right 4px
      color var(--v-secondary-darken2)

  // Title
  &-title
    font-size 20px
    font-weight 700
    margin-bottom 25px
    text-align center
    position relative
    & >>> time
      position absolute
      top -10px
      left -60px

  // Detail
  &-detail
    font-size 13px
    text-align center
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
