<template lang="pug">
  v-card(id="comments")
    v-card-title(class="pa-0")
      v-flex(
        tag="h2"
        class="title"
        mb-3
      )
        | {{ $t('comment.title', { number: comments.length }) }}

    v-flex(
      v-for="(comment, index) in comments"
      :key="index"
      wrap
    )
      comment-list-item(:comment="comment")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Comment } from '@/models/index';

@Component({
  components: {
    CommentListItem: () => import('./ListItem.vue'),
  },
})
export default class List extends Vue {
  // Props
  @Prop({ type: Array, required: true }) readonly comments!: Comment[];
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#comments
  padding 30px 50px
</style>
