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
              <v-flex
                class="teal--text"
                tag="span"
                d-block
                py-0
                style="padding-right: 1px; font-size: 13px;"
              >
                {{ commentNo }}
              </v-flex>
            </v-flex>
          </v-layout>

          <v-flex mt-2 mb-4 wrap>
            <the-markdown-view :content="comment.content" />
          </v-flex>

          <v-flex wrap>
            <v-flex
              class="reply-btn green--text text--darken-2"
              tag="button"
              pa-0
              @click="reply"
            >
              {{ $t('comment.reply') }}
            </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-divider class="mt-2 mb-4" />
  </v-container>
</template>

<script>
import TheMarkdownView from './TheMarkdownView';

export default {
  components: {
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
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.avatar-container
  min-width 44px
  max-width 64px

.reply-btn
  &:focus
    outline none
  &:hover
    color #2E7D32 !important
</style>
