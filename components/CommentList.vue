<template>
  <v-flex wrap>
    <v-flex v-for="(comment, index) in comments" :key="index" wrap>
      <comment-list-item :comment="comment" />
    </v-flex>
  </v-flex>
</template>

<script>
import CommentListItem from './CommentListItem';

export default {
  components: {
    CommentListItem,
  },

  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
