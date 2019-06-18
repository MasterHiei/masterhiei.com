<template lang="pug">
  figure
    div(id="chart-bar" :style="barStyle")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import maxBy from 'lodash/maxBy';
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
   * Return a reversed tags array
   */
  get dataset(): Tag[] {
    return this.data.slice().reverse();
  }

  /**
   * Bar contaner style
   */
  get barStyle(): string {
    return `height: ${this.dataset.length * 40}px;`;
  }

  /**
   * Max value of values
   */
  get maxValue(): number {
    const maxItem = maxBy(this.dataset, 'value');
    return maxItem == null ? 0 : maxItem.value;
  }

  // Hooks
  mounted() {
    this.$nextTick(() => {
      // Initialize echarts
      const dom = document.getElementById('chart-bar');
      const echarts = ECharts.init(dom);

      // Set echarts options
      echarts.setOption({
        textStyle: {
          color: '#757575',
          fontFamily: 'Noto Sans SC, sans-serif',
        },
        title: {
          top: 30,
          left: 'center',
          text: this.$i18n.t('tag.chart.title'),
          textStyle: { fontSize: 20 },
        },
        tooltip: {
          padding: 10,
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        legend: { show: false },
        grid: {
          top: '80',
          right: '120',
          bottom: '80',
          left: '60',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          name: this.$i18n.t('tag.chart.total'),
          nameTextStyle: { padding: 10 },
          minInterval: 1,
        },
        yAxis: { type: 'category' },
        visualMap: [
          {
            type: 'piecewise',
            orient: 'horizontal',
            bottom: 30,
            left: 'center',
            itemWidth: 12,
            itemHeight: 12,
            splitNumber: 4,
            min: 1,
            max: this.maxValue,
            text: [
              this.$i18n.t('tag.chart.more'),
              this.$i18n.t('tag.chart.less'),
            ],
            dimension: 0,
            inRange: {
              color: ['#C6E48B', '#7BC96F', '#239A3B', '#196127'],
            },
          },
        ],
        dataset: { source: this.dataset },
        series: {
          name: this.$i18n.t('tag.chart.total').toString(),
          type: 'bar',
          barCategoryGap: '70%',
          encode: { x: 'value', y: 'name' },
        },
      });

      // Set click event on echarts
      const me = this;
      echarts.on('click', function(params): void {
        me.$router.push(
          me.localePath({ name: 'tags-tag', params: { tag: params.data.name } })
        );
      });
    });
  }
}
</script>
