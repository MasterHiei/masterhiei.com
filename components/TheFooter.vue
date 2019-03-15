<template>
  <v-footer height="auto">
    <v-card class="text-xs-center body-1 font-weight-light flex">
      <v-divider />

      <v-card-text>
        <p class="mb-0">
          &copy;&nbsp;2019&nbsp;
          <a href="https://github.com/MasterHiei">
            Master&nbsp;Hiei
          </a>
        </p>
        <p class="mb-0">
          Powered&nbsp;by
          <a href="https://github.com/nuxt/nuxt.js">
            Nuxt.js
          </a>
          and
          <a href="https://github.com/expressjs/express">
            Express
          </a>
        </p>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
a
  color #00C853
  text-decoration none
  &:hover
    text-decoration underline
  &:active
    color #00C853
</style>
