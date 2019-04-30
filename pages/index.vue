<template lang="pug">
  v-flex(pa-2 wrap)
    // Today
    v-flex(
      class="content-item"
      md4
      xs11
      data-aos="fade-up"
      wrap
    )
      v-card(id="today-card" class="pa-3" flat)
        // Season
        v-flex(
          class="text-xs-center secondary-text middle-line"
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
      class="content-item"
      md6
      xs11
      pt-5
      wrap
    )
      article-list

    //- v-layout(justify-center wrap)
    //-   // Main contents
    //-   v-flex(mt-3 md7 xs12)
    //-     // Title
    //-     v-flex(class="text-xs-center" wrap)
    //-       v-flex(tag="h1" class="primary-text display-2")
    //-         | Master Hiei

    //-       v-flex(tag="h2" class="body-2 secondary-text")
    //-         | 万物有因必有果，洗洗皆可吃

    //-     v-divider(class="my-4")

    //-     article-list

    //-   // Side menu
    //-   v-card(
    //-     id="side-menu"
    //-     class="text-xs-center"
    //-     color="transparent"
    //-     max-width="56"
    //-     flat
    //-   )
    //-     // Search
    //-     v-tooltip(
    //-       left
    //-       color="secondary lighten-3"
    //-       content-class="primary--text"
    //-       lazy
    //-     )
    //-       template(#activator="{ on }")
    //-         v-btn(icon v-on="on" @click="")
    //-           v-icon(color="accent")
    //-             | fas fa-search
    //-       span {{ $t('tooltip.search') }}

    //-     // Github
    //-     v-tooltip(
    //-       left
    //-       color="secondary lighten-3"
    //-       content-class="primary--text"
    //-       lazy
    //-     )
    //-       template(#activator="{ on }")
    //-         v-btn(
    //-           icon
    //-           href="https://github.com/MasterHiei/masterhiei.com"
    //-           target="_blank"
    //-           v-on="on"
    //-         )
    //-           v-icon(color="accent")
    //-             | fab fa-github
    //-       span {{ $t('tooltip.github') }}

    //-     // Feedback
    //-     v-tooltip(
    //-       left
    //-       color="secondary lighten-3"
    //-       content-class="primary--text"
    //-       lazy
    //-     )
    //-       template(#activator="{ on }")
    //-         v-btn(icon v-on="on" @click="")
    //-           v-icon(color="accent")
    //-             | fas fa-bug
    //-       span {{ $t('tooltip.feedback') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ArticleList: () => import('@/components/article/List.vue'),
  },

  async fetch({ store }) {
    await store.dispatch('article/fetchAll');
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
.content-item
  margin 24px auto

#today-card
  background-color rgba(255, 255, 255, 0.3)

.middle-line
  &:before, &:after
    content ''
    vertical-align middle
    display inline-block
    width 15%
    margin  0 4% 4% 4%
    border 1px solid var(--v-secondary-base)


#side-menu
  position fixed
  top 40%
  right 1.3rem
  opacity 0.35
  transition opacity 0.75s
  &:hover
    opacity 1
</style>
