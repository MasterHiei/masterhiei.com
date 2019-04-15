<template>
  <v-container grid-list-xs pa-0>
    <v-layout ma-0 row wrap>
      <v-flex class="avatar-container" pa-0 wrap>
        <v-avatar size="44" tile>
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img v-lazy="comment.user.avatar" :alt="comment.user.username" />
        </v-avatar>
      </v-flex>

      <v-flex pa-0 xs10 sm11 wrap>
        <v-layout ma-0 column wrap>
          <v-layout class="grey--text text--darken-1" ma-0 row>
            <v-flex wrap>
              <v-flex tag="span">
                {{ comment.user.username }}
              </v-flex>

              <v-flex class="caption" tag="span" d-block>
                {{ formatDate(comment.created_at) }}
              </v-flex>
            </v-flex>

            <v-flex class="text-xs-right" justify-end wrap>
              <v-flex tag="span" d-block py-0 pr-2 style="font-size: 13px;">
                {{ commentNo }}
              </v-flex>

              <v-flex pa-0 wrap>
                <v-menu slide-x-transiton>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="ma-0"
                      color="grey lighten-1"
                      flat
                      small
                      icon
                      v-on="on"
                    >
                      <v-icon small>
                        fas fa-ellipsis-h
                      </v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <template v-if="isAuthor">
                      <v-list-tile @click="isEdit = true">
                        <v-list-tile-title
                          class="body-1 green--text text--darken-1"
                        >
                          {{ $t('comment.edit') }}
                        </v-list-tile-title>
                      </v-list-tile>

                      <v-list-tile @click="remove">
                        <v-list-tile-title
                          class="body-1 deep-orange--text accent-4"
                        >
                          {{ $t('comment.remove') }}
                        </v-list-tile-title>
                      </v-list-tile>
                    </template>

                    <template v-else>
                      <v-list-tile @click="reply">
                        <v-list-tile-title
                          class="body-1 green--text text--darken-1"
                        >
                          {{ $t('comment.reply') }}
                        </v-list-tile-title>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-menu>
              </v-flex>
            </v-flex>
          </v-layout>

          <v-flex v-if="!isEdit" mt-2 mb-2 wrap>
            <the-markdown-view :content="comment.content" />
          </v-flex>

          <v-flex v-else class="text-xs-right" mt-2 mb-2 wrap>
            <v-textarea
              v-model="modifiedContent"
              class="body-2"
              solo
              auto-grow
              :label="$t('comment.placeholder')"
            />

            <v-btn color="success" flat small @click="edit">
              {{ $t('comment.update') }}
            </v-btn>

            <v-btn color="error" flat small @click="revokeEdit">
              {{ $t('comment.cancel') }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-divider class="mt-3 mb-4" />

    <the-confirm ref="confirm" />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Comment } from '@/models/index';
import { ConfirmInstance } from '@/types/index';

@Component({
  components: {
    TheConfirm: () => import('./TheConfirm.vue'),
    TheMarkdownView: () => import('./TheMarkdownView.vue'),
  },
})
export default class ComemntListItem extends Vue {
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
</style>
