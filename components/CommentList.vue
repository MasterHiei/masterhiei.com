<template>
  <v-flex wrap>
    <v-flex v-for="(comment, index) in comments" :key="index" wrap>
      <comment-list-item :index="index" :comment="comment" />
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
