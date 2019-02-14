<template>
  <v-flex pa-0 wrap>
    <v-flex px-0 wrap>
      <blockquote class="blockquote pa-0 display-1 font-weight-black">
        {{ article.title }}
      </blockquote>
    </v-flex>
    <v-flex px-0 wrap>
      <v-flex d-inline pl-0 wrap>
        <timeago :datetime="article.createdAt" :locale="$i18n.locale" />
      </v-flex>
      <v-flex d-inline wrap>
        comments: 0
      </v-flex>
    </v-flex>
    <v-flex class="subheading font-weight-regular" px-0 warp>
      {{ slice(article.body) }}
    </v-flex>
    <v-flex class="text-xs-right" py-0>
      <v-btn color="lightgray" flat>
        [ Read More ]
      </v-btn>
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
    slice: text => {
      return text.slice(0, 200) + '...';
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
