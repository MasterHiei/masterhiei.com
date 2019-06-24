<template lang="pug">
  // Search button
  v-toolbar-items
    v-btn(flat @click.stop="openSearchDialog")
      v-icon(class="mr-1" small)
        | fas fa-search
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Mutation } from 'vuex-class';

@Component
export default class TheSearchButton extends Vue {
  // Methods
  @Mutation('OPEN_SEARCH_DIALOG') openSearchDialog;
}
</script>
