<template lang="pug">
  v-container(grid-list-xs pa-1)
    v-layout(row wrap style="height: 44px;")
      // Avatar
      v-flex(class="avatar-container" pa-0 wrap)
        v-avatar(size="44" tile)
          img(v-lazy="comment.user.avatar" :alt="comment.user.username")

      // User info
      v-layout(xs11 sm11 column ma-0 wrap)
        v-layout(class="primary-text" row ma-0 wrap style="height: 44px;")
          v-flex(class="caption" pa-0 wrap)
            v-flex(tag="span")
              | {{ comment.user.username }}
            v-flex(tag="span" d-block)
              | {{ formatDate(comment.created_at) }}

          v-flex(class="text-xs-right" wrap)
            v-flex(tag="span" d-block py-0 pr-2 style="font-size: 13px;")
              | {{ commentNo }}

            v-flex(wrap)
              v-menu(slide-x-transiton)
                template(#activator="{ on }")
                  v-btn(
                    class="ma-0"
                    color="secondary"
                    flat
                    small
                    icon
                    v-on="on"
                  )
                    v-icon(small)
                      | fas fa-ellipsis-h

                v-list
                  template(v-if="isAuthor")
                    v-list-tile(@click="isEdit = true")
                      v-list-tile-title(class="body-1 info-text")
                        | {{ $t('comment.edit') }}

                    v-list-tile(@click="remove")
                      v-list-tile-title(class="body-1 error-text")
                        | {{ $t('comment.remove') }}

                  template(v-else)
                    v-list-tile(@click="reply")
                        v-list-tile(class="body-1 success-text")
                          | {{ $t('comment.reply') }}

    v-flex(v-if="!isEdit" v-html="sanitizedContent" py-2 wrap)

    v-flex(v-else class="text-xs-right" mt-2 mb-2 wrap)
        v-textarea(
          v-model="modifiedContent"
          class="body-2"
          solo
          auto-grow
          :label="$t('comment.placeholder')"
        )

        v-btn(color="success" flat small @click="edit")
          | {{ $t('comment.update') }}

        v-btn(color="error" flat small @click="revokeEdit")
          | {{ $t('comment.cancel') }}

    v-divider(class="mt-3 mb-4")

    v-confirm(ref="confirm")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import sanitizer from '@/common/utils/sanitizer';
import { Comment } from '@/models/index';
import { ConfirmInstance } from '@/types/index';

@Component({
  components: {
    VConfirm: () => import('../ui/VConfirm.vue'),
    MarkdownViewer: () => import('../markdown/Viewer.vue'),
  },
})
export default class ListItem extends Vue {
  // Props
  @Prop({ type: Number, required: true }) readonly index!: number;
  @Prop({ type: Object, required: true })
  readonly comment!: Comment;

  // Data
  isEdit = false;
  modifiedContent = this.comment.content;

  // Coumputed
  get isAuthor(): boolean {
    const user = this.$auth.user;
    if (user == null) return false;
    return user.id === this.comment.user.id;
  }

  get commentNo(): string {
    return `#${this.index + 1}`;
  }

  get confirm(): ConfirmInstance {
    return this.$refs.confirm as ConfirmInstance;
  }

  get sanitizedContent(): string {
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

  edit(): void {
    this.confirm
      .show(this.$i18n.t('comment.confirmEdit'))
      .then(async confirm => {
        if (!confirm) return;
        await this.$axios.$patch(
          `/articles/${this.$route.params.id}/comments/${this.comment.id}`,
          {
            content: this.modifiedContent,
          }
        );
        this.$router.go(0);
      })
      .catch(() => {});
  }

  revokeEdit(): void {
    this.confirm
      .show(this.$i18n.t('comment.revokeEdit'))
      .then(confirm => {
        if (!confirm) return;
        this.isEdit = false;
      })
      .catch(() => {});
  }

  remove(): void {
    this.confirm
      .show(this.$i18n.t('comment.confirmRemove'))
      .then(async confirm => {
        if (!confirm) return;
        await this.$axios.$delete(
          `/articles/${this.$route.params.id}/comments/${this.comment.id}`
        );
        this.$router.go(0);
      })
      .catch(() => {});
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.avatar-container
  min-width 44px
  max-width 64px
  max-height 44px
</style>
