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
      v-card(class="today-card pa-3" flat)
        // Season
        v-flex(
          class="today-title text-xs-center secondary-text"
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
        v-layout(wrap)
          v-flex(
            tag="span"
            class="display-4 font-weight-medium accent-text text-xs-right"
            mr-3
          )
            | {{ dayOfMonth }}

          v-layout(
            class="secondary-text justify-center ml-3"
            column
            wrap
          )
            span(class="display-1 d-block")
              | {{ $d(now, 'weekday', this.$i18n.locale) }}

            div(class="my-1")

            span(class="title")
              | {{ $d(now, 'date', this.$i18n.locale) }}

        // Poem
        v-flex(
          class="text-xs-center subheading secondary-text font-italic"
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
      const response = e.response;
      const statusCode = response ? response.status : 500;
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
        poem: '好雨知時節，當春乃発生。',
      };
    }

    // Summer
    if (month >= 6 && month <= 8) {
      return {
        word: 'Summer',
        locale: this.$i18n.t('season.summer').toString(),
        poem: '小荷才露尖尖角，早有蜻蜓立上頭。',
      };
    }

    // Autumn
    if (month >= 9 && month <= 11) {
      return {
        word: 'Autumn',
        locale: this.$i18n.t('season.autumn').toString(),
        poem: '停車坐愛楓林晩，霜葉紅於二月花。',
      };
    }

    // Winter
    return {
      word: 'Winter',
      locale: this.$i18n.t('season.winter').toString(),
      poem: '孤舟蓑笠翁，独釣寒江雪。',
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

.today
  &-card
    background-color rgba(255, 255, 255, 0.3)
  &-title
    &:before, &:after
      content ''
      vertical-align middle
      display inline-block
      width 15%
      margin  0 4% 4% 4%
      border 1px solid var(--v-secondary-base)
</style>
