<template lang="pug">
  figure
    v-flex(class="chart-title" wrap)
      v-icon
        | fas fa-chart-bar
      | {{ $t('tag.chart.title') }}
    div(ref="bar" :style="barStyle")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import maxBy from 'lodash/maxBy';
import groupBy from 'lodash/groupBy';
import size from 'lodash/size';
import ECharts from 'echarts/lib/echarts';
import { Tag } from 'models/tag';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/visualMap';

@Component
export default class TheBar extends Vue {
  // Props
  @Prop({ type: Array, default: () => [] })
  readonly data!: Tag[];

  // Coumputed

  /**
   * Bar contaner style
   */
  get barStyle(): string {
    return `height: ${this.data.length * 40}px;`;
  }

  /**
   * Max value of values
   */
  get maxValue(): number {
    const maxItem = maxBy(this.data, 'value');
    return maxItem == null ? 0 : maxItem.value;
  }

  /**
   * Split number of values
   */
  get splitNumber(): number {
    const group = groupBy(this.data, 'value');
    return size(group);
  }

  /**
   * X axis name
   */
  get xAxisName(): string {
    if (this.$device.isMobile) {
      return '';
    }
    return this.$i18n.t('tag.chart.total').toString();
  }

  // Hooks
  mounted() {
    this.$nextTick(() => {
      // Initialize echarts
      const dom = this.$refs.bar as HTMLDivElement;
      const echarts = ECharts.init(dom);

      // Set echarts option
      echarts.setOption({
        textStyle: {
          color: '#757575',
          fontFamily: 'Noto Sans SC, sans-serif',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
        },
        legend: { show: false },
        grid: {
          top: '10',
          right: '30',
          bottom: '50',
          left: '30',
          containLabel: !this.$device.isMobile,
        },
        xAxis: {
          type: 'value',
          name: this.xAxisName,
          nameLocation: 'center',
          nameTextStyle: { padding: 10 },
          minInterval: 1,
        },
        yAxis: {
          type: 'category',
          show: !this.$device.isMobile,
        },
        visualMap: [
          {
            type: 'piecewise',
            splitNumber: this.splitNumber,
            orient: 'horizontal',
            left: 'center',
            min: 1,
            max: this.maxValue,
            text: [
              this.$i18n.t('tag.chart.more'),
              this.$i18n.t('tag.chart.less'),
            ],
            dimension: 0,
            inRange: {
              color: ['#C6E48B', '#239A3B', '#196127'],
            },
          },
        ],
        dataset: { source: this.data },
        series: [
          {
            name: this.$i18n.t('tag.chart.total').toString(),
            type: 'bar',
            barCategoryGap: '65%',
            encode: { x: 'value', y: 'name' },
          },
        ],
      });
    });
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.chart-title
  text-align center
  font-size 20px
  font-weight 700
  padding-bottom 12px
  .v-icon
    font-size 24px
    color var(--v-primary-base)
    margin 0 8px 4px 0
</style>
