<template lang="pug">
  div(ref="pie" class="chart-pie")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import ECharts, { EChartOption } from 'echarts';

@Component
export default class ThePie extends Vue {
  // Props
  @Prop({ type: Array, default: () => [] })
  readonly data!: EChartOption.SeriesPie.DataObject[];

  // Hooks
  mounted() {
    this.$nextTick(() => {
      // Initialize echarts
      const dom = this.$refs.pie as HTMLDivElement;
      const echarts = ECharts.init(dom);

      // Set echarts option
      echarts.setOption({
        textStyle: { fontFamily: 'Noto Sans SC, sans-serif' },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b} : {c} ({d}%)',
        },
        legend: { show: false },
        series: [
          {
            name: 'Tags',
            type: 'pie',
            radius: ['50%', '70%'],
            label: {
              normal: { show: false, position: 'center' },
              emphasis: {
                show: true,
                textStyle: { fontSize: '20', fontWeight: 'bold' },
              },
            },
            labelLine: { normal: { show: false } },
            data: this.data,
          },
        ],
      });
    });
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.chart-pie
  height 100%
  min-height 400px
</style>
