<template lang="pug">
  v-hover
    v-card(
        slot-scope="{ hover }"
        class="post text-xs-center"
        :class="`elevation-${ hover ? 8 : 2 }`"
      )
        // Image
        v-card-title(
          class="post-image pa-0"
          :class="{ 'scale': hover }"
        )
          img(v-lazy="article.image" :alt="article.title")

        // Content
        v-card-text(class="post-content")
          // Datetime
          post-date-time(:datetime="article.created_at")

          // Tags
          v-flex(class="post-content-tag" wrap)
            n-link(
              v-for="(tag, index) in article.tags"
              :key="index"
              :to="localePath({ name: 'articles-tags-tag', params: { tag: tag } })"
            )
              | \#{{ tag }}

          // Title
          v-flex(
            class="post-content-title title font-weight-bold"
            wrap
          )
            n-link(
              :to="localePath({ name: 'articles-id', params: { id: article.id } })"
              exact
            )
              | {{ article.title }}

          // Detail
          v-flex(
            class="post-content-detail"
          )
            // Views
            span(class="detail-item")
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
            span(class="detail-item")
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
  // Link
  a
    &:hover
      text-decoration underline

  // Animation
  .scale
    img
      opacity 1
      transform scale(1.1)

  // Image
  &-image
    overflow hidden
    img
      height auto
      width 100%
      opacity 0.8
      transition opacity 1s, transform 1s

  // Detail
  &-content
    padding 25px 25px 35px 25px
    &>>>time
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
      margin-bottom 25px
      a
        transition color 0.15s linear 0s
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
