<template lang="pug">
  article(data-aos="zoom-in")
    v-card.post
      // Image
      v-card-title.post-image
        n-link(
          :to="localePath({ name: 'articles-id', params: { id: article.id } })"
          exact
        )
          img(
            v-lazy="article.image"
            :alt="article.title"
            draggable="false"
          )

      // Content
      v-card-text.post-content
        // Datetime
        post-date-time(:datetime="article.created_at")

        // Tags
        v-flex(class="post-content-tag" wrap)
          n-link(
            v-for="(tag, index) in article.tags"
            :key="index"
            :to="localePath({ name: 'tags-tag', params: { tag: tag } })"
          )
            | \#{{ tag }}

        // Title
        v-flex(class="post-content-title" wrap)
          n-link(
            :to="localePath({ name: 'articles-id', params: { id: article.id } })"
            exact
          )
            | {{ article.title }}

        // Detail
        v-flex(class="post-content-detail" wrap)
          // Views
          span.detail-item
            v-icon(small)
              | far fa-eye
            | {{ $t('article.views', { number: article.views }) }}

          // Comments
          n-link(
            class="detail-item"
            :to="`${localePath({ name: 'articles-id', params: { id: article.id } })}#comments`"
            exact
          )
            v-icon(small)
              | far fa-comments
            | {{ $t('article.comments', { number: commentCount }) }}

          // Stars
          span.detail-item
            v-icon(small)
              | far fa-heart
            | {{ $t('article.stars', { number: article.stars }) }}
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace } from 'nuxt-property-decorator';
import * as issue from '@/store/issue';

const Issue = namespace(issue.name);

@Component({
  components: {
    PostDateTime: () => import('./Datetime.vue'),
  },
})
export default class ListItem extends Vue {
  // Props
  @Prop({ type: Object, required: true })
  readonly article!: Record<string, string>;

  // Computed
  @Issue.Getter findOneById;

  /**
   * Comment count number
   */
  get commentCount(): number {
    const issue = this.findOneById(this.article.id);
    if (issue == null) return 0;
    return issue.comments;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.post
  position relative
  text-align center
  transition box-shadow .15s linear 0s
  box-shadow 0 1px 6px rgba(0, 0, 0, .12), 0 1px 4px rgba(0, 0, 0, .24)
  &:hover
    box-shadow 0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23)
    .post-image img
      opacity 1
      transform scale3d(1.1, 1.1, 1)

  // Link
  a:hover
    text-decoration underline

  // Image
  &-image
    padding 0
    overflow hidden
    justify-content center
    img
      width 100%
      height auto
      opacity 0.8
      display block
      backface-visibility hidden
      transition opacity 1s, transform 1s
      position relative
      &[lazy=loading]
        width 60px
        padding 30px 0

  // Detail
  &-content
    padding 25px 25px 35px 25px
    & >>> time
      position absolute
      top 20px
      right 20px

    // Tag
    &-tag
      font-size 11px
      margin-bottom 26px
      a
        margin-right 4px
        color var(--v-secondary-darken2)

    // Title
    &-title
      font-size 20px
      font-weight 700
      margin-bottom 25px
      a
        transition color .15s linear 0s
        &:hover
          color var(--v-accent-base)
          text-decoration none

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
</style>
