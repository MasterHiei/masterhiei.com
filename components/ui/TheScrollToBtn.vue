<template>
  <v-fab-transition>
    <v-btn
      v-show="show"
      v-scroll-to="{ el: 'body' }"
      color="secondary"
      fab
      fixed
      right
      bottom
    >
      <v-icon color="white" small>
        fas fa-angle-up
      </v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TheScrollToBtn extends Vue {
  // Props
  @Prop({ type: Boolean, required: true }) readonly show!: boolean;
}
</script>
