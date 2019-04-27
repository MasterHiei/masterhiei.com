<template lang="pug">
  v-container(pa-0)
    v-layout(justify-center wrap)
        // My card
        v-flex(tag="section" wrap)
          v-card(width="100%")
            // Avatar
            v-card-title(class="text-xs-center pa-0")
              v-flex(wrap)
                img(
                  id="my-avatar"
                  src="https://avatars1.githubusercontent.com/u/20240686?v=4"
                )

            // Info
            v-card-text
              v-flex(class="text-xs-center primary-text")
                // Profile
                v-flex(tag="section" wrap)
                  v-flex(class="title font-weight-bold" wrap)
                    | {{ $t('profile.name') }}
                  v-flex(class="subheading" my-2 wrap)
                    | {{ $t('profile.position') }}

                // Skills
                v-flex(tag="section" my-5 data-aos="zoom-in")
                  v-flex(tag="span" class="headline font-weight-bold d-block" mb-4)
                    v-icon(left) fas fa-wrench
                    | {{ $t('profile.skill') }}
                  v-layout(justify-center wrap)
                    v-flex(md8 xs11)
                      v-card(color="secondary")
                        v-card-text
                          v-layout(class="text-xs-left" wrap)
                            v-flex(
                              v-for="(skill, index) in skills"
                              :key="index"
                              xs12
                              md6
                              my-2
                              px-2
                             wrap
                            )
                              span {{ skill.name }}
                              v-progress-linear(
                                :value="skill.percentage"
                                class="my-1"
                                height="4"
                                color="accent"
                              )

    //- v-layout(justify-center wrap)
    //-   // Main contents
    //-   v-flex(mt-3 md7 xs12)
    //-     // Title
    //-     v-flex(class="text-xs-center" wrap)
    //-       v-flex(tag="h1" class="primary-text display-2")
    //-         | Master Hiei

    //-       v-flex(tag="h2" class="body-2 secondary-text")
    //-         | 万物有因必有果，洗洗皆可吃

    //-     v-divider(class="my-4")

    //-     article-list

    //-   // Side menu
    //-   v-card(
    //-     id="side-menu"
    //-     class="text-xs-center"
    //-     color="transparent"
    //-     max-width="56"
    //-     flat
    //-   )
    //-     // Search
    //-     v-tooltip(
    //-       left
    //-       color="secondary lighten-3"
    //-       content-class="primary--text"
    //-       lazy
    //-     )
    //-       template(#activator="{ on }")
    //-         v-btn(icon v-on="on" @click="")
    //-           v-icon(color="accent")
    //-             | fas fa-search
    //-       span {{ $t('tooltip.search') }}

    //-     // Github
    //-     v-tooltip(
    //-       left
    //-       color="secondary lighten-3"
    //-       content-class="primary--text"
    //-       lazy
    //-     )
    //-       template(#activator="{ on }")
    //-         v-btn(
    //-           icon
    //-           href="https://github.com/MasterHiei/masterhiei.com"
    //-           target="_blank"
    //-           v-on="on"
    //-         )
    //-           v-icon(color="accent")
    //-             | fab fa-github
    //-       span {{ $t('tooltip.github') }}

    //-     // Feedback
    //-     v-tooltip(
    //-       left
    //-       color="secondary lighten-3"
    //-       content-class="primary--text"
    //-       lazy
    //-     )
    //-       template(#activator="{ on }")
    //-         v-btn(icon v-on="on" @click="")
    //-           v-icon(color="accent")
    //-             | fas fa-bug
    //-       span {{ $t('tooltip.feedback') }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ArticleList: () => import('@/components/article/List.vue'),
  },

  async fetch({ store }) {
    await store.dispatch('article/fetchAll');
  },
})
export default class IndexPage extends Vue {
  // Data
  skills = [
    { name: 'Swift', percentage: '75' },
    { name: 'Java', percentage: '65' },
    { name: 'JavaScript', percentage: '65' },
    { name: 'HTML & CSS', percentage: '59' },
    { name: 'SQL', percentage: '61' },
    { name: 'Coding Style', percentage: '80' },
  ];
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#side-menu
  position fixed
  top 40%
  right 1.3rem
  opacity 0.35
  transition opacity 0.75s
  &:hover
    opacity 1

#my-avatar
  border-radius 50%
  margin-top -75px
  width 150px
  height 150px
</style>
