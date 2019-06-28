<template lang="pug">
  v-container(pt-5 mt-5)
    v-layout(justify-center wrap)
        // My card
        v-flex(md8 xs11 wrap)
          v-card.my-card.pb-5
            // My Avatar
            v-flex(class="text-xs-center" pb-4 wrap)
              img(
                id="my-avatar"
                src="https://avatars1.githubusercontent.com/u/20240686?v=4"
              )

            // My Info
            v-layout.my-info(wrap)
              v-flex(md10 xs11 wrap)
                // Profile
                v-flex(tag="section")
                  v-flex(class="title font-weight-bold" wrap)
                    | {{ $t('profile.name') }}

                  v-flex(class="subheading" mt-3 wrap)
                    | {{ $t('profile.position') }}

                // Experiences
                v-flex.info-exp(tag="section")
                  // Title
                  v-flex.section-title(wrap)
                    v-icon
                      | fas fa-briefcase
                    | {{ $t('profile.experience') }}

                  // Contents
                  v-timeline.my-3(:dense="$device.isMobile")
                    v-timeline-item(
                      v-for="(exp, index) in experiences"
                      :key="index"
                      color="accent"
                      small
                    )
                      v-card.exp-card(
                        :data-aos="$device.isMobile ? 'fade-up' : exp.aos"
                      )
                        v-card-title
                          v-flex(tag="span" class="body-2 accent-text")
                            | {{ exp.date }}

                        v-card-text(class="py-0")
                          v-flex(tag="span" class="title d-block")
                            v-icon(class="mr-2 mb-2" color="primary lighten-1")
                              | {{ exp.icon }}
                            | {{ exp.title }}

                          v-flex(tag="span" class="caption secondary-text d-block")
                            | {{ exp.position }}

                        v-card-text(class="text-xs-left px-4")
                          | {{ exp.desc }}

                // Skills
                v-flex(
                  tag="section"
                  class="info-skill"
                  data-aos="zoom-in"
                )
                  // Title
                  v-flex.section-title(wrap)
                    v-icon
                      | fas fa-wrench
                    | {{ $t('profile.skill') }}

                  // Content
                  v-layout.skill-list(wrap)
                    v-flex(
                      v-for="(skill, index) in skills"
                      :key="index"
                      class="skill"
                      md6
                      xs12
                      wrap
                    )
                      | {{ skill.name }}

                      v-progress-linear(
                        :value="skill.percentage"
                        class="my-1"
                        height="4"
                        color="accent"
                      )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  // Transition animation
  transition: 'page',
})
export default class AboutPage extends Vue {
  // Computed

  /**
   * My skills
   */
  get skills() {
    return [
      { name: 'Swift', percentage: '76' },
      { name: 'Java', percentage: '55' },
      { name: 'HTML & CSS', percentage: '60' },
      { name: 'JavaScript', percentage: '72' },
      { name: 'SQL', percentage: '61' },
      { name: 'Coding Style', percentage: '80' },
    ];
  }

  /**
   * My experiences
   */
  get experiences() {
    return [
      {
        aos: 'fade-right',
        date: '2018 - 2019',
        icon: 'fab fa-apple',
        title: 'iOS',
        position: 'Developer',
        desc: this.$i18n.t('profile.desc2018'),
      },
      {
        aos: 'fade-left',
        date: '2017 - 2018',
        icon: 'fab fa-java',
        title: 'Java',
        position: 'Developer',
        desc: this.$i18n.t('profile.desc2017'),
      },
    ];
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.my-card
  #my-avatar
    border-radius 50%
    margin-top -75px
    width 150px
    height 150px
  .info-exp, .info-skill
    margin-top 30px
    .section-title
      font-size 24px
      font-weight 700
      padding-bottom 16px
      .v-icon
        color var(--v-primary-base)
        margin 0 8px 4px 0

  .my-info
    text-align center
    justify-content center
    .info-exp .exp-card
      border-top 4px solid var(--v-accent-base)
    .info-skill .skill-list .skill
      padding 4px
</style>
