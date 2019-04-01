<template>
  <v-flex mt-2 wrap>
    <v-divider class="mb-4" />

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
