<template lang="pug">
  v-toolbar-items
    // Pages
    v-toolbar-items(
      v-for="(page, index) in pages"
      :key="index"
    )
      v-btn(
        active-class=""
        :class="didScroll ? 'primary-text' : 'secondary-text'"
        :to="page.path"
        flat
        nuxt
        exact
      )
        v-icon(class="mr-1" small)
          | {{ page.icon }}
        | {{ page.text }}

    // Localization
    v-toolbar-items
      v-menu(offset-y transition="slide-y-transition")
        v-btn(
          :class="didScroll ? 'primary-text' : 'secondary-text'"
          slot="activator"
          flat
        )
          v-icon(class="mr-1" small)
            | fas fa-globe
          | {{ $t('link.locale') }}

        v-list
          v-list-tile(
            v-for="(locale, index) in locales"
            :key="index"
            :to="switchLocalePath(locale.code)"
            nuxt
            exact
          )
            v-list-tile-title(class="text-xs-center")
              v-flex(tag="span" class="primary-text body-2")
                | {{ locale.name }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { NuxtVueI18n } from 'nuxt-i18n/types/vue';

@Component
export default class TheHeader extends Vue {
  // Props
  @Prop({ type: Boolean, required: true }) readonly didScroll!: boolean;
  @Prop({ type: Array, required: true }) readonly pages!: object[];
  @Prop({ type: Array, required: true })
  readonly locales!: (string | NuxtVueI18n.Options.LocaleObject)[];
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
