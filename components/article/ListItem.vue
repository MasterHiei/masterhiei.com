<template lang="pug">
  v-hover
    v-card(
        slot-scope="{ hover }"
        class="text-xs-center"
        :class="`elevation-${ hover ? 8 : 2 }`"
      )
        // Image
        v-card-title(
          class="post-image pa-0"
          :class="{ 'img-scale': hover }"
        )
          img(:src="article.image" :alt="article.title")

        // Detail
        v-card-text(class="post-detail")
          // Datetime
          post-date-time(:datetime="article.created_at")

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
            n-link(
              :to="localePath({ name: 'articles-id', params: { id: article.id } })"
            )
              | {{ article.title }}

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
            n-link(
              :to="`${localePath({ name: 'articles-id', params: { id: article.id } })}#comments`"
            )
              v-icon(small)
                | far fa-comments
              | {{ comments }}

            // Stars
            span
              v-icon(small)
                | far fa-heart
              | {{ $t('article.stars', { number: article.stars }) }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

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
  /**
   * Number of comments with i18n
   */
  get comments(): string {
    const comments = this.article.comments || [];
    let count = 0;
    if (comments != null) {
      count = comments.length;
    }
    return this.$i18n.t('article.comments', { number: count }).toString();
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
a:hover
  text-decoration underline

.post-image
  overflow hidden
  &>img
    height auto
    width 100%
    opacity 0.8
    transition opacity 1s, transform 1s

.img-scale
  &>img
    opacity 1
    transform scale(1.1)

.post-detail
  padding 25px 25px 35px 25px
  &>>>time
    position absolute
    top 20px
    right 20px

.post-tags
  font-size 11px
  margin-bottom 26px
  &>a
    margin-right 4px
    color var(--v-secondary-darken2)

.post-title
  margin-bottom 25px
  &>a
    transition color 0.15s linear 0s
  &>a:hover
    color var(--v-accent-base)
    text-decoration none

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
</style>
