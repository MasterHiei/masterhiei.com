<template>
  <v-flex mt-2 wrap>
    <v-divider class="mb-4" />

    <v-flex v-for="(comment, index) in comments" :key="index" wrap>
      <comment-list-item :index="index" :comment="comment" />
    </v-flex>
  </v-flex>
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
