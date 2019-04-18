<template lang="pug">
  v-footer(height="auto" color="grey lighten-5")
    v-flex(
      class="text-xs-center font-weight-light"
      xs12
      wrap
    )
      // MasterHiei
      v-flex(tag="p" mt-3 mb-0)
        | &copy;&nbsp;2019&nbsp;
        v-flex(
          tag="a"
          class="green--text text--darken-2"
          href="https://github.com/MasterHiei"
          target="_blank"
        )
          | Master&nbsp;Hiei

      // Powered by
      v-flex(tag="p" mt-0)
        | Powered&nbsp;by
        v-flex(
          tag="a"
          class="green--text text--darken-2"
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
        )
          | &nbsp;Nuxt.js
        | &nbsp;and
        v-flex(
          tag="a"
          class="green--text text--darken-2"
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
a
  text-decoration none
  &:hover
    text-decoration underline
</style>
