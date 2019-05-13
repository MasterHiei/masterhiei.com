<template lang="pug">
  v-flex(class="section" pa-2 wrap)
    // Today
    v-flex(
      tag="section"
      class="today section-item"
      md4
      xs11
      data-aos="fade-up"
      wrap
    )
      v-card(class="today-card pa-3")
        // Season
        v-flex(
          class="today-title text-xs-center"
          py-3
          wrap
        )
          span(class="display-2")
            | {{ season.locale }}

          span(class="mx-2")
            | &middot;

          span(class="title")
            |{{ season.word }}

        // Date
        v-layout(class="today-date" wrap)
          // Day
          v-flex(class="day display-4" xs6)
            | {{ dayOfMonth }}

          // Weekday
          v-flex(class="today-weekday" xs6 wrap)
            span(class="weekday display-1")
              | {{ $d(now, 'weekday', this.$i18n.locale) }}

            span(class="month title")
              | {{ $d(now, 'date', this.$i18n.locale) }}

        // Poem
        v-flex(
          class="today-poem"
          py-3
          wrap
        )
          | {{ season.poem }}

    // Articles
    v-flex(
      tag="section"
      class="section-item"
      md6
      xs11
      pt-4
      wrap
      data-aos="fade-up"
    )
      article-list
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { AxiosError } from 'axios';

@Component({
  components: {
    ArticleList: () => import('@/components/article/List.vue'),
  },

  // Hooks
  async fetch({ store, error }) {
    await Promise.all([
      store.dispatch('article/fetch', 1),
      store.dispatch('issue/fetch'),
    ]).catch((e: AxiosError) => {
      const statusCode = e.response ? e.response.status : 500;
      error({ statusCode: statusCode, message: e.message });
    });
  },
})
export default class IndexPage extends Vue {
  // Computed

  /**
   * Now
   */
  get now(): Date {
    return new Date();
  }

  /**
   * Season
   */
  get season(): Record<string, string> {
    const month = this.now.getMonth() + 1;

    // Spring
    if (month >= 3 && month <= 5) {
      return {
        word: 'Spring',
        locale: this.$i18n.t('season.spring').toString(),
        poem: '《春夜喜雨》- 好雨知時節，當春乃発生。',
      };
    }

    // Summer
    if (month >= 6 && month <= 8) {
      return {
        word: 'Summer',
        locale: this.$i18n.t('season.summer').toString(),
        poem: '《小池》- 小荷才露尖尖角，早有蜻蜓立上頭。',
      };
    }

    // Autumn
    if (month >= 9 && month <= 11) {
      return {
        word: 'Autumn',
        locale: this.$i18n.t('season.autumn').toString(),
        poem: '《水調歌頭》- 但願人長久，千里共嬋娟。',
      };
    }

    // Winter
    return {
      word: 'Winter',
      locale: this.$i18n.t('season.winter').toString(),
      poem: '《江雪》- 孤舟蓑笠翁，独釣寒江雪。',
    };
  }

  /**
   * Day of month
   */
  get dayOfMonth(): number {
    return this.now.getDate();
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.section
  &-item
    margin 24px auto
  // Today card
  .today
    &-card
      box-shadow 0 1px 6px rgba(0, 0, 0, .12), 0 1px 4px rgba(0, 0, 0, .24)
    &-title
      color var(--v-secondary-darken2)
      &:before, &:after
        content ''
        vertical-align middle
        display inline-block
        width 14%
        margin  0 4% 4% 4%
        border 1px solid var(--v-secondary-darken2)
    &-date
      .day
        color var(--v-accent-base)
        font-weight 500
        text-align right
        padding-right 20px
    &-weekday
      text-align left
      padding-left 20px
      .weekday, .month
        display block
        margin 16px 0
    &-poem
      color var(--v-secondary-darken2)
      text-align center
      font-style italic
</style>
