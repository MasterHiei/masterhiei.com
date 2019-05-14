<template lang="pug">
  div
    | tags

    the-pie
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {
    ThePie: () => import('@/components/chart/ThePie.vue'),
  },
})
export default class TagsPage extends Vue {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
