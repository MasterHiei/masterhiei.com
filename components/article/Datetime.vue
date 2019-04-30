<template lang="pug">
  v-card(
    tag="time"
    :datetime="datetime"
    class="post-datetime text-xs-center white--text pa-2"
    width="58"
    height="58"
    color="accent"
    tile
    flat
  )
    v-flex(
      tag="span"
      class="day title font-weight-bold"
    )
      | 04
    v-flex(
      tag="span"
      class="month font-weight-bold"
    )
      | Feb
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ListItem extends Vue {
  // Props
  @Prop({ type: String, required: true }) readonly datetime!: string;
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.post-datetime
  position absolute
  top 20px
  right 20px
  &>span
    display block
  &>.day
    margin-bottom 1px
  &>.month
    font-size 13px
</style>
