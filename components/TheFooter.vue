<template>
  <v-footer height="auto" color="grey lighten-5">
    <v-flex class="text-xs-center font-weight-light" xs12 wrap>
      <v-flex tag="p" mt-3 mb-0>
        &copy;&nbsp;2019&nbsp;
        <a
          class="green--text text--darken-2"
          href="https://github.com/MasterHiei"
          target="_blank"
        >
          Master&nbsp;Hiei
        </a>
      </v-flex>
      <v-flex tag="p" mt-0>
        Powered&nbsp;by
        <a
          class="green--text text--darken-2"
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
        >
          Nuxt.js
        </a>
        and
        <a
          class="green--text text--darken-2"
          href="https://github.com/expressjs/express"
          target="_blank"
        >
          Express
        </a>
      </v-flex>
    </v-flex>
  </v-footer>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
a
  text-decoration none
  &:hover
    text-decoration underline
</style>
