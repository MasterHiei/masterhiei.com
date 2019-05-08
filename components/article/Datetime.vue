<template lang="pug">
  v-tooltip(top)
    // Datetime
    template(#activator="{ on }")
      v-card(
        tag="time"
        :datetime="datetime"
        class="post-datetime text-xs-center white--text pa-2"
        width="58"
        height="58"
        color="accent"
        tile
        flat
        v-on="on"
      )
        // Day
        v-flex(
          tag="span"
          class="day font-weight-bold"
        )
          | {{ day }}

        // Month
        v-flex(
          tag="span"
          class="month font-weight-bold"
        )
          | {{ monthWithEn }}

    // Tooltip
    span {{ $d(date, 'short', this.$i18n.locale) }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class ListItem extends Vue {
  // Props
  @Prop({ type: String, required: true }) readonly datetime!: string;

  // Computed

  /**
   * Post date
   */
  get date(): Date {
    return new Date(this.datetime);
  }

  /**
   * Post month with i18n(en-US)
   */
  get monthWithEn(): string {
    return this.$i18n.d(this.date, 'month', 'en-US');
  }

  /**
   * Post day of month
   */
  get day(): number {
    return this.date.getDate();
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.post-datetime
  & span
    display block
    height 18px
    line-height 18px
  & .day
    font-size 19px
    margin 2px 0 2px 0
  & .month
    font-size 12px
</style>
