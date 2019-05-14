<template lang="pug">
  no-ssr
    v-flex(ref="pie" id="pie-chart" wrap)
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import ECharts from 'echarts';

@Component
export default class TheWordCloud extends Vue {
  // Hooks
  mounted() {
    this.$nextTick(() => {
      // Initialize echarts
      const dom = this.$refs.pie as HTMLDivElement;
      const echarts = ECharts.init(dom);

      // Set echarts option
      echarts.setOption({
        title: { text: 'This is a title' },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: ['data1', 'data2', 'data3'],
        },
        series: [
          {
            name: 'Tags',
            type: 'pie',
            radius: ['50%', '70%'],
            label: {
              normal: { show: false, position: 'center' },
              emphasis: {
                show: true,
                textStyle: { fontSize: '30', fontWeight: 'bold' },
              },
            },
            labelLine: { normal: { show: false } },
            data: [
              { name: 'data1', value: 50 },
              { name: 'data2', value: 120 },
              { name: 'data3', value: 480 },
            ],
          },
        ],
      });
    });
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#pie-chart
  min-height 400px
</style>
