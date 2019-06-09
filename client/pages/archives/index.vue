<template lang="pug">
  v-flex(
    tag="section"
    class="section-item"
    md6
    xs11
    wrap
  )
    // Calendar
    v-card(v-if="$device.isDesktopOrTablet")
      the-calendar(:data="yearMonthDay")

    // Timeline
    v-layout(justify-center wrap)
      v-flex(md10 wrap)
        v-timeline(align-top dense)
          // Year
          v-timeline-item(color="accent" large)
            v-flex(pt-2 wrap)
              strong.display-1
                | {{ year }}

          // Items
          v-timeline-item(
            v-for="(month, index) in createdMonths"
            :key="index"
            color="accent"
            small
          )
            v-layout(pt-2 wrap)
              v-flex(pa-2 md2 wrap)
                strong
                  | {{ month.month }}

              v-flex(pa-2 md8 wrap)
                article-list-item(:article="findArticleById(month.id)")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import dayjs from 'dayjs';
import { Article } from '@/models/article';

// Interface declaration
declare interface CreatedMonth {
  id: Article['id'];
  month: string;
  date: Article['created_at'];
}

@Component({
  components: {
    TheCalendar: () => import('@/components/chart/TheCalendar.vue'),
    ArticleListItem: () => import('@/components/article/ListItem.vue'),
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
export default class ArchivesPage extends Vue {
  // Data
  articles: Article[] = [];

  // Computed

  /**
   * The number of year
   */
  get year(): number {
    return dayjs().year();
  }

  /**
   * Article created month list
   */
  get createdMonths(): CreatedMonth[] {
    const createdMonths: CreatedMonth[] = [];
    const months: string[] = [];
    this.articles.forEach((article): void => {
      const createdAt = dayjs(article.created_at);
      let month = createdAt.month().toString();
      if (months.includes(month)) {
        month = '';
      } else {
        months.push(month);
        month = this.$i18n.d(createdAt.toDate(), 'month', this.$i18n.locale);
      }
      createdMonths.push({
        id: article.id,
        month: month,
        date: article.created_at,
      });
    });
    return createdMonths;
  }

  // Methods

  /**
   * Find article by id
   */
  findArticleById(id: string): Article | undefined {
    return this.articles.find((article): boolean => article.id === id);
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.section-item
  margin 48px auto 24px auto
  >>> .v-timeline-item
    .v-card::before, .v-card::after
      display none
</style>
