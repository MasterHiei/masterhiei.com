<template lang="pug">
  v-navigation-drawer(
    v-model="show"
    absolute
    temporary
    app
  )
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { State } from 'vuex-class';

@Component
export default class TheNavDrawer extends Vue {
  // Data
  @State showNavDrawer;
  show = false;

  // Watch
  @Watch('showNavDrawer')
  onDrawerStateChanged(): void {
    // Open nav drawer when state changed
    this.show = true;
  }
}
</script>
