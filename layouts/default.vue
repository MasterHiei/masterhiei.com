<template>
  <v-app>
    <navbar />

    <v-content>
      <nuxt />
    </v-content>

    <v-footer>
      <div>footer</div>
    </v-footer>
  </v-app>
</template>

<script>
import navbar from '@/components/navbar/navbar';

export default {
  components: {
    navbar,
  },
};
</script>
