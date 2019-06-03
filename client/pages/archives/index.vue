<template lang="pug">
  v-flex(
    tag="section"
    class="section-item"
    md6
    xs11
    wrap
  )
    // Calendar
    v-card(class="calendar-card")
      the-calendar(:data="yearMonthDay")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {
    TheCalendar: () => import('@/components/chart/TheCalendar.vue'),
  },

  // Hooks
  async asyncData({ $axios }) {
    const { articles, yearMonthDay } = await $axios.$get('/archives');
    return { articles, yearMonthDay };
  },

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
    padding 0 24px
</style>
