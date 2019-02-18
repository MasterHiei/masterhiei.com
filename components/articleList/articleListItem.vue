<template>
  <v-flex pa-0 wrap>
    <v-flex px-0 wrap>
      <blockquote class="blockquote pa-0 display-1 font-weight-black">
        {{ article.title }}
      </blockquote>
    </v-flex>
    <v-flex wrap>
      <v-flex d-inline pl-0 wrap>
        <v-chip color="white" text-color="grey darken-1" small outline disabled>
          <v-avatar>
            <v-icon color="#7F8688">
              fas fa-clock
            </v-icon>
          </v-avatar>
          <timeago :datetime="article.createdAt" :locale="$i18n.locale" />
        </v-chip>
      </v-flex>
      <v-flex d-inline wrap>
        <v-chip color="white" text-color="grey darken-1" small outline disabled>
          <v-avatar>
            <v-icon color="#7F8688">
              fas fa-comments
            </v-icon>
          </v-avatar>
          {{ numberOfComments() }}
        </v-chip>
      </v-flex>
    </v-flex>
    <v-flex pa-0>
      <v-flex
        ref="bodyContainer"
        :class="[
          { 'content-hidden': isShowCover },
          'subheading font-weight-regular overflow-y-hidden',
        ]"
        px-0
        warp
      >
        {{ article.body }}

        <div v-show="isShowCover" class="cover-view" />
      </v-flex>
    </v-flex>
    <v-flex wrap>
      <v-btn
        class="font-weight-bold ma-0"
        round
        block
        depressed
        color="#C19434"
      >
        Read More
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
  data() {
    return {
      isShowCover: false,
      maxHeight: 480,
    };
  },
  mounted() {
    const height = this.$refs.bodyContainer.clientHeight;
    if (height > this.maxHeight) {
      this.isShowCover = true;
    }
  },
  methods: {
    numberOfComments() {
      let message = this.article.comments.length;
      message += ' ';
      message += this.$t('article.comments.unit');
      return message;
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.content-hidden
  position relative
  max-height 480px
  z-index 99
.cover-view
  height 100%
  width 100%
  position absolute
  top 0
  left 0
  z-index 100
  background -webkit-linear-gradient(to bottom, rgba(255, 255, 255, 0), #FAFAFA)
  background -moz-linear-gradient(to bottom, rgba(255, 255, 255, 0), #FAFAFA)
  background -o-linear-gradient(to bottom, rgba(255, 255, 255, 0), #FAFAFA)
  background linear-gradient(to bottom, rgba(255, 255, 255, 0), #FAFAFA)
</style>
