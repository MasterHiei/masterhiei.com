<template lang="pug">
  v-fab-transition
    v-btn(
      v-show="show"
      v-scroll-to="{ el: 'body' }"
      color="info"
      fab
      fixed
      right
      bottom
    )
      v-icon(color="white" small)
        | fas fa-angle-up
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TheScrollToBtn extends Vue {
  // Props
  @Prop({ type: Boolean, required: true }) readonly show!: boolean;
}
</script>
