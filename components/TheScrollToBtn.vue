<template>
  <v-fab-transition>
    <v-btn
      v-show="show"
      id="scroll-to-btn"
      v-scroll-to="{ el: 'body' }"
      color="secondary"
      fab
      fixed
      right
      bottom
    >
      <v-icon color="white" small>
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
      required: true,
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
