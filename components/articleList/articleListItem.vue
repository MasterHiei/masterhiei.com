<template>
  <v-flex wrap>
    <blockquote class="blockquote pa-1 display-1 font-weight-black">
      {{ article.title }}
    </blockquote>
    <v-flex warp>
      {{ article.body }}
    </v-flex>
  </v-flex>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    toggleLike: () => {
      return 2;
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
