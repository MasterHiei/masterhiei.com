<template>
  <v-flex wrap>
    <v-divider class="mb-3" />

    <v-flex px-0 wrap>
      <v-avatar size="44" tile>
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img v-lazy="comment.user.avatar" :alt="comment.user.username" />
      </v-avatar>

      <v-flex d-inline-block wrap>
        <v-flex tag="span">
          {{ comment.user.username }}
        </v-flex>

        <v-flex d-block tag="span">
          {{ comment.created_at }}
        </v-flex>
      </v-flex>
    </v-flex>

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
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.shadow-around
  box-shadow 0 0px 4px rgba(0, 0, 0, .156863), 0 0px 4px rgba(0, 0, 0, .227451)
</style>
