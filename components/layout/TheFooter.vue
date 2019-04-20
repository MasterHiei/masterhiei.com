<template lang="pug">
  v-footer(height="auto")
    v-flex(
      class="text-xs-center caption font-weight-light primary-text"
      xs12
      wrap
    )
      // MasterHiei
      v-flex(tag="p" mt-3 mb-0)
        | &copy;&nbsp;2019&nbsp;
        a(
          href="https://github.com/MasterHiei"
          target="_blank"
        )
          | Master&nbsp;Hiei

      // Powered by
      v-flex(tag="p" mt-0)
        | Powered&nbsp;by
        a(
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
        )
          | &nbsp;Nuxt.js
        | &nbsp;and

        a(
          href="https://github.com/expressjs/express"
          target="_blank"
        )
          | &nbsp;Express
        | .
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TheFooter extends Vue {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.v-footer
  background-color var(--v-secondary-lighten1)

a
  color var(--v-accent-base)
  text-decoration none
  &:hover
    text-decoration underline
  &:visited
    color var(--v-accent-base)
</style>
