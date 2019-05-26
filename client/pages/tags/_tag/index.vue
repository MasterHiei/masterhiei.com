<template lang="pug">
  div
    | {{ $route.params }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  // Transition animation
  transition: {
    enterActiveClass: 'animated slideInLeft',
    leaveActiveClass: 'animated slideOutRight',
  },

  // Hooks
  async asyncData({ $axios, params }) {
    const { articles } = await $axios.$get(`/tags/${params.tag}`);
    return { articles };
  },
})
export default class TagPage extends Vue {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
