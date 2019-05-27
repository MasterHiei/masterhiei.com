<template lang="pug">
  v-toolbar-items
    // Nav button
    v-toolbar-items
      v-btn(flat @click.stop="openNavDrawer")
        v-icon(:color="didScroll ? 'primary' : 'secondary'")
          | fas fa-bars
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Mutation } from 'vuex-class';
import { NuxtVueI18n } from 'nuxt-i18n/types/vue';

@Component
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
