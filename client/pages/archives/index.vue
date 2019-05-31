<template lang="pug">
  v-flex(
    tag="section"
    class="section-item"
    md6
    xs11
    wrap
  )
    // Calendar
    v-card(class="calendar-card") ads
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  // Transition animation
  transition: {
    enterActiveClass: 'animated slideInLeft',
    leaveActiveClass: 'animated slideOutRight',
  },
})
export default class ArchivesPage extends Vue {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.section-item
  margin 48px auto 24px auto
  .calendar-card
    padding 30px
</style>
