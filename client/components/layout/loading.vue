<template lang="pug">
  div.spinner-container(v-if="loading")
    div.spinner
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class Loading extends Vue {
  // Data
  loading = false;

  // Methods

  /**
   * Show spinner
   */
  start(): void {
    this.loading = true;
  }

  /**
   * Hide spinner
   */
  finish(): void {
    this.loading = false;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.spinner-container
  position fixed
  top 0
  right 0
  width 100%
  height 100%
  z-index 999
  background-color var(--v-secondary-base)
  .spinner
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    margin auto
    width 6rem
    height 6rem
    background-color var(--v-accent-base)
    border-radius 50%
    animation sk-scaleout 1.0s infinite ease-in-out

// Animation
@keyframes sk-scaleout
  0%
    transform scale(0)
  100%
    transform scale(1.0)
    opacity 0
</style>
