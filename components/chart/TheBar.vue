<template lang="pug">
  div(ref="bar" :style="barStyle")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { maxBy, groupBy, size } from 'lodash';
import ECharts from 'echarts';
import { Tag } from 'models/tag';

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

  // Hooks
  mounted() {
    this.$nextTick(() => {
      // Initialize echarts
      const dom = this.$refs.bar as HTMLDivElement;
      const echarts = ECharts.init(dom);

      // Set echarts option
      echarts.setOption({
        textStyle: { fontFamily: 'Noto Sans SC, sans-serif' },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
        },
        legend: { show: false },
        grid: {
          top: '10',
          right: '30',
          bottom: '65',
          left: '30',
          containLabel: !this.$device.isMobile,
        },
        xAxis: {
          type: 'value',
          name: this.$i18n.t('tag.total').toString(),
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
            text: [this.$i18n.t('tag.more'), this.$i18n.t('tag.less')],
            dimension: 0,
            inRange: {
              color: ['#4CAF50', '#E65100'],
            },
          },
        ],
        dataset: { source: this.data },
        series: [
          {
            name: this.$i18n.t('tag.total').toString(),
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
