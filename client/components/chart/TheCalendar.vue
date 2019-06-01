<template lang="pug">
  figure
    div#chart-calendar
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { YearMonthDay } from 'models/yearMonthDay';
import ECharts from 'echarts/lib/echarts';
import 'echarts/lib/chart/heatmap';

@Component
export default class TheCalendar extends Vue {
  // Props
  @Prop({ type: Array, required: true }) readonly data!: YearMonthDay[];

  // Hooks
  mounted() {
    this.$nextTick(() => {
      // Initialize echarts
      const dom = document.getElementById('chart-calendar');
      const echarts = ECharts.init(dom);

      // Set echarts options
      echarts.setOption({});
    });
  }
}
</script>
