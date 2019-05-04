<template lang="pug">
  v-flex(class="comment-container")
    // Avatar
    v-avatar(class="d-inline-block" size="44" tile)
      img(
        v-lazy="comment.user.avatar"
        :alt="comment.user.username"
      )

    // Content
    v-flex(class="comment-content" wrap)
      // Meta
      v-flex(class="comment-meta" mb-2 wrap)
        // Author
        a(class="comment-author")
          | {{ comment.user.username }}

        // Date
        v-tooltip(right)
          template(#activator="{ on }")
            span(class="caption ml-2" v-on="on")
              | {{ distanceToNow }}

          // Tooltip
          span
            | {{ formatDate(comment.created_at) }}

      // Text
      v-flex(v-html="sanitizedHTML" wrap)

      // Actions
      v-flex(wrap)
        a(class="comment-reply" @click="reply")
          | {{ $t('comment.reply') }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { distanceInWordsToNow } from 'date-fns';
import ja from 'date-fns/locale/ja';
import zh from 'date-fns/locale/zh_cn';
import sanitizer from '@/common/utils/sanitizer';
import { Comment } from '@/models/index';

@Component({
  components: {
    VConfirm: () => import('../ui/VConfirm.vue'),
  },
})
export default class ListItem extends Vue {
  // Props
  @Prop({ type: Object, required: true })
  readonly comment!: Comment;

  // Data
  isEdit = false;
  modifiedContent = this.comment.content;

  // Computed
  /**
   * Import date-fns i18n file
   */
  get locales(): object {
    return {
      'zh-CN': zh,
      'ja-JP': ja,
    };
  }

  /**
   * Distance in words to now with i18n
   */
  get distanceToNow(): string {
    return distanceInWordsToNow(new Date(this.comment.created_at), {
      addSuffix: true,
      locale: this.locales[this.$i18n.locale],
    });
  }

  /**
   * Sanitize HTML string
   */
  get sanitizedHTML(): string {
    const md = this.$md.render(this.comment.content);
    return sanitizer(md);
  }

  // Methods
  formatDate(date: string): string {
    return this.$d(new Date(date), 'long', this.$i18n.locale);
  }

  reply(): void {
    // TODO: reply a comment
    console.log(this.comment.id);
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.comment-container
  display flex
  padding 12px 0

.comment-content
  padding 12px 16px
  margin-left 20px
  vertical-align top
  flex 1
  background-color #f6f9fe

.comment-meta
  position relative
  color var(--v-secondary-darken2)

.comment-author
  font-weight 700
  &:hover
    color var(--v-accent-base)

.comment-reply
  font-size 12px
  color var(--v-secondary-darken2)
  &:hover
    color var(--v-accent-base)
</style>
