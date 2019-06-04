<template lang="pug">
  figure
    div#chart-calendar
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import dayjs from 'dayjs';
import map from 'lodash/map';
import values from 'lodash/values';
import ECharts from 'echarts/lib/echarts';
import { YearMonthDay } from 'models/yearMonthDay';
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/calendar';

@Component
export default class TheCalendar extends Vue {
  // Props
  @Prop({ type: Array, required: true }) readonly data!: YearMonthDay[];

  // Computed

  /**
   * Calendar range
   */
  get range(): string[] {
    const template = 'YYYY-MM-DD';
    const end = dayjs();
    const start = end.subtract(1, 'year');
    return [start.format(template), end.format(template)];
  }

  /**
   * ECharts series data
   */
  get seriesData(): (string | number)[][] {
    const seriesData = this.data;
    const originDates = map(this.data, 'date');
    const start = dayjs(this.range[0]).valueOf();
    const end = dayjs(this.range[1]).valueOf();
    const oneDayMilliseconds = 24 * 60 * 60 * 1000;
    for (let ms = start; ms <= end; ms += oneDayMilliseconds) {
      // Fill data if no activity
      const ymd = dayjs(ms).format('YYYY-MM-DD');
      if (!originDates.includes(ymd)) {
        seriesData.push({ value: 0, date: ymd });
      }
    }
    return seriesData.map(
      (item): (string | number)[] => values(item).reverse()
    );
  }

  // Methods

  /**
   * Tooltip formatter
   */
  formatter(data: any): string {
    const date = this.$i18n.d(
      dayjs(data.value[0]).toDate(),
      'short',
      this.$i18n.locale
    );
    const number = data.value[1];
    if (number === 0) {
      return this.$i18n
        .t('archives.chart.tooltip.noData', { date: date })
        .toString();
    }
    return this.$i18n
      .t('archives.chart.tooltip.normal', {
        date: date,
        number: number,
      })
      .toString();
  }

  // Hooks
  mounted() {
    this.$nextTick(() => {
      // Initialize echarts
      const dom = document.getElementById('chart-calendar');
      const echarts = ECharts.init(dom);

      // Set echarts options
      echarts.setOption({
        textStyle: {
          color: '#191919',
          fontFamily: 'Noto Sans SC, sans-serif',
        },
        title: {
          top: 24,
          left: 'center',
          text: this.$i18n.t('archives.chart.title'),
        },
        tooltip: {
          position: 'top',
          padding: 10,
          formatter: this.formatter,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          textStyle: {
            color: '#FFF',
            fontSize: 12,
            fontWerght: 'lighter',
          },
        },
        visualMap: {
          type: 'piecewise',
          orient: 'horizontal',
          bottom: 24,
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          pieces: [
            { min: 1, max: 2, color: '#C6E48B' },
            { min: 3, max: 5, color: '#7bc96f' },
            { min: 6, max: 7, color: '#239A3B' },
            { min: 8, max: 999, color: '#196127' },
          ],
          text: [
            this.$i18n.t('archives.chart.more'),
            this.$i18n.t('archives.chart.less'),
          ],
        },
        calendar: {
          top: 85,
          right: 'center',
          cellSize: 10,
          splitLine: { show: false },
          range: this.range,
          itemStyle: {
            color: '#EBEDF0',
            borderColor: '#FFF',
            borderWidth: 2,
          },
          yearLabel: { show: false },
          monthLabel: {
            nameMap: this.$i18n
              .t('archives.chart.monthLabel')
              .toString()
              .split(','),
            color: '#767676',
            fontSize: 11,
          },
          dayLabel: {
            nameMap: this.$i18n
              .t('archives.chart.dayLabel')
              .toString()
              .split(','),
            color: '#767676',
            fontSize: 11,
          },
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: this.seriesData,
        },
      });
    });
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#chart-calendar
  height 220px
</style>
