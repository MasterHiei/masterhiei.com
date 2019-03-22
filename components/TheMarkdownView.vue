<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <v-flex class="padding-view" wrap v-html="$md.render(content)" />
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
.padding-view
  padding 8px 25px 15px 25px !important
</style>
