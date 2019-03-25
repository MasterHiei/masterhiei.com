<template>
  <v-flex wrap>
    <v-divider class="mb-3" />

    <v-container grid-list-xs pa-0>
      <v-layout ma-0 row wrap>
        <v-avatar size="44" tile>
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img v-lazy="comment.user.avatar" :alt="comment.user.username" />
        </v-avatar>

        <v-flex class="grey--text text--darken-1" d-inline-block ml-3 wrap>
          <v-flex tag="span">
            {{ comment.user.username }}
          </v-flex>

          <v-flex d-block tag="span">
            {{ dateFormate(comment.created_at) }}
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>

    <v-flex my-1 wrap>
      <the-markdown-view :content="comment.content" />
    </v-flex>
  </v-flex>
</template>

<script>
import TheMarkdownView from './TheMarkdownView';

export default {
  components: {
    TheMarkdownView,
  },

  props: {
    comment: {
      type: Object,
      required: true,
    },
  },

  methods: {
    dateFormate(dateStr) {
      return this.$d(new Date(dateStr), 'long', this.$i18n.locale);
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.shadow-around
  box-shadow 0 0px 4px rgba(0, 0, 0, .156863), 0 0px 4px rgba(0, 0, 0, .227451)
</style>
