<template lang="pug">
  v-toolbar(
    class="header-nav"
    :flat="!didScroll"
    height="60"
    app
  )
    // Burger button
    v-toolbar-items
      // Nav button
      v-toolbar-items
        v-btn(flat @click.stop="openNavDrawer")
          v-icon
            | fas fa-bars

    v-spacer

    // Logo
    v-toolbar-title.header-logo
      n-link(:to="localePath('index')" extra)
        img(src="/logo.png" alt="Mr.Hiei")

    v-spacer

    // Search button
    the-search-button
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Mutation } from 'vuex-class';
import { NuxtVueI18n } from 'nuxt-i18n/types/vue';

@Component({
  components: {
    TheSearchButton: () => import('@/components/ui/TheSearchButton.vue'),
  },
})
export default class TheHeader extends Vue {
  // Props
  @Prop({ type: Boolean, required: true }) readonly didScroll!: boolean;
  @Prop({ type: Array, required: true }) readonly pages!: object[];
  @Prop({ type: Array, required: true })
  readonly locales!: (string | NuxtVueI18n.Options.LocaleObject)[];

  // Methods
  @Mutation('OPEN_NAV_DRAWER') openNavDrawer;
}
</script>
