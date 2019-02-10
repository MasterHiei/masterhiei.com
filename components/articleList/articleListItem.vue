<template>
  <v-flex wrap>
    <v-card class="article-item mx-auto" color="lightGray" flat tile>
      <v-card-title>
        <v-chip label color="green" text-color="white" disabled>
          {{ article.type }}
        </v-chip>
        <span class="article-item-title title font-weight-bold text-truncate">
          {{ article.title }}
        </span>
      </v-card-title>

      <blockquote
        class="article-item-body blockquote font-weight-regular text-truncate"
      >
        {{ article.body }}
      </blockquote>

      <v-card-actions>
        <v-layout wrap>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-img
                class="elevation-2"
                src="https://avatars.io/instagram/masterhiei"
                alt="avatar"
                max-height="24"
                max-width="24"
              />
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="body-2 font-weight-bold">
                {{ article.createdBy }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="body-2">
                <timeago
                  :auto-update="60"
                  :datetime="article.createdAt"
                  :locale="$i18n.locale"
                />
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-spacer />

          <v-list-tile>
            <v-list-tile-content>
              <v-chip color="white" text-color="green" disabled>
                <v-avatar>
                  <v-icon color="green" @click="toggleLike">
                    fas fa-thumbs-up
                  </v-icon>
                </v-avatar>
                <span class="subheading font-weight-bold">
                  {{ article.stars }}
                </span>
              </v-chip>
            </v-list-tile-content>
          </v-list-tile>
        </v-layout>
      </v-card-actions>
    </v-card>
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

<style scoped lang="stylus" rel="stylesheet/stylus">
.article-item
  border 0.5px solid lightgray
.article-item-title
  padding 0 1rem
.article-item-body
  padding-top  0
</style>
