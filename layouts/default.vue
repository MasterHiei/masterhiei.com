<template>
  <v-app>
    <navbar />
    <nuxt />
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
