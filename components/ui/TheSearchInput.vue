<template>
  <v-text-field
    v-model="text"
    prepend-icon="fas fa-search"
    full-width
    @blur="show = false"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class VSearchInput extends Vue {
  // Data
  text = '';
}
</script>
