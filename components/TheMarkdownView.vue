<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <v-flex wrap v-html="$md.render(content)" />
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
>>>code:before, >>>code:after
  content none
</style>
