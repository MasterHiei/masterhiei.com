<template lang="pug">
  v-dialog(
    v-model="show"
    max-width="80%"
    lazy
  )
    v-card
      v-card-title
        | Search

      v-card-text
        | Body
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { State } from 'vuex-class';

@Component
export default class TheSearchDialog extends Vue {
  // Data
  @State showSearchDialog;
  show = false;

  // Watch
  @Watch('showSearchDialog')
  onDialogStateChanged(): void {
    console.log('111');
    // Show dialog when state changed
    this.show = true;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
