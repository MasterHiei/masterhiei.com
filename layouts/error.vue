<template lang="pug">
  div
    | {{ error }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class ErrorPage extends Vue {
  // Props
  @Prop({ type: Object, default: null }) readonly error?: Record<
    number,
    string
  >;
}
</script>
