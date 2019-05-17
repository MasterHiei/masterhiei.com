<template lang="pug">
  v-fab-transition
    v-btn(
      v-show="show"
      v-scroll-to="{ el: 'body' }"
      id="btn-scroll-to"
      color="accent"
      fab
      small
      fixed
    )
      v-icon(color="white" small)
        | fas fa-angle-up
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class TheScrollToBtn extends Vue {
  // Props
  @Prop({ type: Boolean, required: true }) readonly show!: boolean;
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#btn-scroll-to
  right 40px
  bottom 35px
</style>
