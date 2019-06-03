<template lang="pug">
  figure
    div#chart-calendar
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import dayjs from 'dayjs';
import maxBy from 'lodash/maxBy';
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
   * Max value of values
   */
  get maxValue(): number {
    const maxItem = maxBy(this.data, 'value');
    if (maxItem == null) {
      return 0;
    }
    return maxItem.value;
  }

  /**
   * ECharts series data
   */
  get seriesData(): (string | number)[][] {
    return this.data.map((item): (string | number)[] => values(item).reverse());
  }

  // Methods

  /**
   * Tooltip formatter
   */
  formatter(data: any): string {
    const date = dayjs(data.value[0]).format('MMM D, YYYY');
    return `${
      data.value[1]
    } contributions <span style='color: #D7D7D7; font-weight: 300;'> on ${date}</span>`;
  }

  // Hooks
  mounted() {
    this.$nextTick(() => {
      // Initialize echarts
      const dom = document.getElementById('chart-calendar');
      const echarts = ECharts.init(dom);

      // Set echarts options
      echarts.setOption({
        title: {
          top: 20,
          left: 'center',
          text: 'Calendar',
        },
        tooltip: {
          padding: 10,
          formatter: this.formatter,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          textStyle: {
            color: '#FFF',
            fontSize: 12,
            fontWerght: 'lighter',
            fontFamily: 'Noto Sans SC, sans-serif',
          },
        },
        visualMap: {
          show: false,
          min: 0,
          max: this.maxValue,
          inRange: {
            symbol: 'rect',
            color: ['#C6E48B', '#239A3B', '#196127'],
          },
        },
        calendar: {
          top: 75,
          right: 'center',
          cellSize: 10,
          splitLine: { show: false },
          itemStyle: {
            borderColor: '#FFF',
            borderWidth: 2,
          },
          yearLabel: { show: false },
          monthLabel: {
            color: '#767676',
            fontSize: 10,
            fontFamily: 'Noto Sans SC, sans-serif',
          },
          dayLabel: {
            nameMap: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
            color: '#767676',
            fontSize: 9,
            fontFamily: 'Noto Sans SC, sans-serif',
          },
          range: '2019',
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
