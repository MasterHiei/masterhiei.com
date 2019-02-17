<template>
  <v-flex pa-0 wrap>
    <v-flex px-0 wrap>
      <blockquote class="blockquote pa-0 display-1 font-weight-black">
        {{ article.title }}
      </blockquote>
    </v-flex>
    <v-flex px-0 wrap>
      <v-flex d-inline pl-0 wrap>
        <v-chip color="white" text-color="grey darken-1" small outline disabled>
          <v-avatar>
            <v-icon>fas fa-clock</v-icon>
          </v-avatar>
          <timeago :datetime="article.createdAt" :locale="$i18n.locale" />
        </v-chip>
      </v-flex>
      <v-flex d-inline wrap>
        <v-chip color="white" text-color="grey darken-1" small outline disabled>
          <v-avatar>
            <v-icon>fas fa-comments</v-icon>
          </v-avatar>
          {{ numberOfComments() }}
        </v-chip>
      </v-flex>
    </v-flex>
    <v-flex class="subheading font-weight-regular" px-0 warp>
      {{ slice() }}
    </v-flex>
    <v-flex class="text-xs-right" pt-0>
      <v-btn class="font-weight-bold ma-0" color="lightgray" flat>
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
    slice() {
      return this.article.body.slice(0, 200) + '...';
    },
    numberOfComments() {
      let message = this.article.comments.length;
      message += ' ';
      message += this.$t('article.comments.unit');
      return message;
    },
  },
};
</script>
