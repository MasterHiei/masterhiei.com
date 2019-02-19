<template>
  <v-fab-transition>
    <v-btn
      v-show="show"
      id="scroll-to-btn"
      v-scroll-to="{ el: 'body' }"
      color="#B89F5D"
      fab
      fixed
      right
      bottom
    >
      <v-icon color="#F7F4E9">
        fas fa-angle-up
      </v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#scroll-to-btn
  right 3%
  bottom 3%
  z-index 1000
</style>
