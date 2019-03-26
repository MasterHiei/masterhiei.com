<template>
  <v-container grid-list-xs pa-0>
    <v-divider class="mb-3" />

    <v-layout ma-0 row wrap>
      <v-flex pa-0 sm1 xs2 wrap>
        <v-avatar size="44" tile>
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img v-lazy="comment.user.avatar" :alt="comment.user.username" />
        </v-avatar>
      </v-flex>

      <v-flex pa-0 sm11 xs10 wrap>
        <v-layout ma-0 sm11 xs10 column wrap>
          <v-layout class="grey--text text--darken-1" ma-0 row>
            <v-flex wrap>
              <v-flex tag="span">
                {{ comment.user.username }}
              </v-flex>

              <v-flex class="caption" tag="span" d-block>
                {{ dateFormate(comment.created_at) }}
              </v-flex>
            </v-flex>

            <v-flex class="text-xs-right caption" justify-end wrap>
              <v-flex tag="span" d-block py-0 style="padding-right: 1px;">
                {{ commentNo }}
              </v-flex>

              <v-flex
                class="reply-btn green--text text--darken-1"
                tag="button"
                pa-0
                @click="reply"
              >
                {{ $t('comment.reply') }}
              </v-flex>
            </v-flex>
          </v-layout>

          <v-flex mt-2 mb-4 wrap>
            <the-markdown-view :content="comment.content" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
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
.reply-btn:focus
    outline none
    text-decoration underline
</style>
