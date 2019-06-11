<template lang="pug">
  no-ssr
    infinite-loading(
      :spinner="spinner"
      @infinite="infinite"
    )
      // No results
      template(#no-results)
        error(:error="{ statusCode: 404, message: 'No results.' }")

      // No more data
      template(#no-more)
        span

      // Error
      template(#no-results)
        error(:error="{ statusCode: 500, message: 'Error.' }")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { SpinnerType, StateChanger } from 'vue-infinite-loading';

@Component({
  components: {
    InfiniteLoading: () => import('vue-infinite-loading'),
    Error: () => import('@/layouts/error.vue'),
  },
})
export default class VInfiniteLoading extends Vue {
  // Props
  @Prop({ type: String, default: 'waveDots' }) readonly spinner!: SpinnerType;
  @Prop({ type: Function, required: true }) readonly infinite!: (
    $state: StateChanger
  ) => void;
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.infinite-loading-container
  margin-top 16px
</style>
