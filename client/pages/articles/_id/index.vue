<template lang="pug">
  v-layout(justify-center wrap)
    // Main content
    v-flex(class="post" md5 wrap)
      // Article
      v-card(ref="article" tag="article")
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
              a(class="detail-item" href="#comments")
                v-icon(small)
                  | far fa-comments
                | {{ $t('article.comments', { number: commentCount }) }}

          // Body
          v-flex.markdown-body(
            v-html="renderedMD"
            class="post-text"
            wrap
          )

      // Gitalk
      the-gitalk(:articleId="article.id")

    // Sidebar
    v-flex(
      v-if="$device.isDesktopOrTablet"
      class="sidebar"
      md2
      wrap
    )
      // My profile
      v-flex.my-profile(wrap)
        v-flex.my-profile-avatar(wrap)
          img(
            src="https://avatars1.githubusercontent.com/u/20240686?v=4"
            :alt="$i18n.t('profile.name')"
          )

        v-flex.my-profile-name(wrap)
          | {{ $t('profile.name') }}

        v-flex.my-profile-position(wrap)
          | {{ $t('profile.position') }}

      v-divider.sidebar-divider(ref="divider")

      // TOC
      v-flex(
        v-if="tocHTML.length > 0"
        id="table-of-contents"
        :class="{ 'sticky': isSticky}"
        wrap
      )
        v-flex.toc-title(wrap)
          v-icon(size="20")
            | fas fa-list-ul
          | {{ $t('article.toc') }}

        v-flex.toc-body(
          v-html="tocHTML"
          wrap
        )
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';
import throttle from 'lodash/throttle';
import md from '@/utils/markdownIt';
import * as issue from '@/store/issue';
import { Article } from '@/models/article';

// Vuex module
const Issue = namespace(issue.name);

@Component({
  components: {
    PostDateTime: () => import('@/components/ui/article/Datetime.vue'),
    TheGitalk: () => import('@/components/ui/TheGitalk.vue'),
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

  // Transition animation
  transition: 'page',
})
export default class ArticlePage extends Vue {
  // Data
  article!: Article;
  tocHTML = '';
  isSticky = false;

  // Hooks
  mounted() {
    // Generate TOC
    if (this.$refs.article instanceof Vue) {
      const article = this.$refs.article as Vue;
      const tocElms = article.$el.getElementsByClassName('markdown-it-toc');
      if (tocElms.length > 0) {
        this.tocHTML = tocElms[0].innerHTML;
      }
    }

    // Execute only desktop and tablet device
    if (this.$device.isDesktopOrTablet) {
      // Listen page scroll event
      document.addEventListener('scroll', throttle(this.didScroll, 1000 / 60), {
        passive: true,
      });

      // Trigger scroll event one time on page load
      this.didScroll();
    }
  }

  beforeDestroy() {
    // Remove listener
    document.removeEventListener('scroll', throttle(this.didScroll, 1000 / 60));
  }

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
   * Returns rendered markdown HTML
   */
  get renderedMD(): string {
    const rendered = md.render(this.article.content);
    return rendered;
  }

  // Methods

  /**
   * Trigger on page scroll
   */
  didScroll(): void {
    if (this.$refs.divider instanceof Vue) {
      const divider = this.$refs.divider as Vue;
      const dividerBottom = divider.$el.getBoundingClientRect().bottom;
      this.isSticky = dividerBottom <= 80;
    }
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
// Sidebar
.sidebar
  max-width 300px
  padding 16px 24px
  &-divider
    padding-bottom 24px

  // Profile
  .my-profile
    padding-bottom 24px
    &-avatar
      img
        width 100%
        height auto
        display block
    &-name
      font-size 20px
      font-weight 500
      text-align center
      margin 8px 0
    &-position
      text-align center

  // Sticky style
  .sticky
    position fixed
    top 80px
    background-color transparent
    box-shadow none

  // TOC
  #table-of-contents
    .toc-title
      font-size 20px
      font-weight 500
      margin-bottom 8px
      .v-icon
        margin 0 6px 3px 0
    .toc-body
      >>> li
        padding 3px 0
      >>> ol
        list-style-type disc
        padding-left 20px
        ol
          list-style-type circle
          padding-left 20px
          ol
            list-style-type square
            padding-left 20px
        a
          &:hover
            color var(--v-accent-base)
            text-decoration underline

// Article
.post
  padding 16px 24px
  margin-bottom 50px
  min-width 640px
  +screen-width-less-than(sm)
    min-width 0
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
    >>> .markdown-body
      h1, h2, h3
        cursor pointer
        &:hover .anchor
          display block
        .anchor
          display none
          color var(--v-accent-base)
          margin-top 4px
      h1 .anchor
        font-size 24px
        margin-left -16px
      h2 .anchor
        font-size 20px
        margin-left -14px
      h3 .anchor
        font-size 18px
        margin-left -13px
      .markdown-it-toc
        display none

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
    >>> time
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
