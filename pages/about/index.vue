<template lang="pug">
  v-container(pt-5 mt-5)
    v-layout(justify-center wrap)
        // My card
        v-flex(md8 xs11 wrap)
          v-card(class="pb-5")
            // My Avatar
            v-flex(class="text-xs-center" pb-4 wrap)
              img(
                id="my-avatar"
                src="https://avatars1.githubusercontent.com/u/20240686?v=4"
              )

            // My Info
            v-layout(class="text-xs-center" justify-center wrap)
              v-flex(md10 xs11 wrap)
                // Profile
                v-flex(tag="section")
                  v-flex(class="title font-weight-bold" wrap)
                    | {{ $t('profile.name') }}

                  v-flex(class="subheading" mt-2 wrap)
                    | {{ $t('profile.position') }}

                // TODO: Need mobile version
                // Experiences
                v-flex(tag="section" class="section-padding")
                  // Title
                  v-flex(tag="span" class="headline font-weight-bold d-block" mb-4)
                    v-icon(class="mb-1" left)
                      | fas fa-briefcase
                    | {{ $t('profile.experience') }}

                  // Contents
                  v-timeline
                    v-timeline-item(
                      v-for="(experience, index) in experiences"
                      :key="index"
                      color="accent"
                      small
                    )
                      v-card(class="experience-card" tile :data-aos="experience.aos")
                        v-card-title
                          v-flex(tag="span" class="body-2 accent-text")
                            | {{ experience.date }}

                        v-card-text(class="py-0")
                          v-flex(tag="span" class="title d-block")
                            v-icon(class="mr-2 mb-2" color="primary lighten-1")
                              | {{ experience.icon }}
                            | {{ experience.title }}

                          v-flex(tag="span" class="caption secondary-text d-block")
                            | {{ experience.position }}

                        v-card-text(class="text-xs-left px-4")
                          p
                            | {{ experience.desc }}

                // Skills
                v-flex(tag="section" class="section-padding" data-aos="zoom-in")
                  // Title
                  v-flex(tag="span" class="headline font-weight-bold d-block" mb-2)
                    v-icon(class="mb-1" left)
                      | fas fa-wrench
                    | {{ $t('profile.skill') }}

                  // Contents
                  v-layout(wrap)
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
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class AboutPage extends Vue {
  // Computed

  /**
   * My skills
   */
  get skills() {
    return [
      { name: 'Swift', percentage: '72' },
      { name: 'Java', percentage: '60' },
      { name: 'JavaScript', percentage: '65' },
      { name: 'HTML & CSS', percentage: '59' },
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
        desc:
          'Had the opportunity to develop iOS Apps with Swift, and built something like Membership App and Bank Account Opening App. Technology consists of RxSwift, Realm Database, Jenkins, fastlane.',
      },
      {
        aos: 'fade-left',
        date: '2017 - 2018',
        icon: 'fab fa-java',
        title: 'Java',
        position: 'Developer',
        desc:
          'The beginning of my career. Built or enhanced enterprise management system with Java. Technology consists of HTML & CSS, jQuery, Spring Framework, Apache Struts, and RDBMS like PostgreSQL, Oracle Database.',
      },
    ];
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#my-avatar
  border-radius 50%
  margin-top -75px
  width 150px
  height 150px

.section-padding
  padding-top 60px

.experience-card
  border-top 4px solid var(--v-accent-base)
</style>
