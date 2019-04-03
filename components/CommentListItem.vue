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
                {{ dateFormate(comment.created_at) }}
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
              v-model="editedContent"
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

<script>
import TheConfirm from './TheConfirm';
import TheMarkdownView from './TheMarkdownView';
export default {
  components: {
    TheConfirm,
    TheMarkdownView,
  },

  props: {
    index: {
      type: Number,
      required: true,
    },

    comment: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isAuthor: this.$auth.user.id === this.comment.user.id,
      isEdit: false,
      editedContent: this.comment.content,
    };
  },

  computed: {
    commentNo() {
      const no = this.index + 1;
      return `#${no}`;
    },
  },

  methods: {
    dateFormate(dateStr) {
      return this.$d(new Date(dateStr), 'long', this.$i18n.locale);
    },

    reply() {
      console.log(this.comment.id);
    },

    edit() {
      this.$refs.confirm
        .show('', this.$i18n.t('comment.confirmEdit'))
        .catch(() => {})
        .then(async confirm => {
          if (!confirm) {
            return;
          }

          await this.$axios.$patch(
            `/articles/${this.$route.params.id}/comments/${this.comment.id}`,
            {
              content: this.editedContent,
            }
          );
          this.$router.go();
        });
    },

    revokeEdit() {
      this.$refs.confirm
        .show('', this.$i18n.t('comment.revokeEdit'))
        .catch(() => {})
        .then(confirm => {
          if (!confirm) {
            return;
          }

          this.isEdit = false;
        });
    },

    remove() {
      this.$refs.confirm
        .show('', this.$i18n.t('comment.confirmRemove'))
        .catch(() => {})
        .then(async confirm => {
          if (!confirm) {
            return;
          }

          await this.$axios.$delete(
            `/articles/${this.$route.params.id}/comments/${this.comment.id}`
          );
          this.$router.go();
        });
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.avatar-container
  min-width 44px
  max-width 64px
</style>
