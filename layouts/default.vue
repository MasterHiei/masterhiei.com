<template>
  <v-app>
    <navbar />
    <v-container>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script>
import navbar from '@/components/navbar/navbar'

export default {
  components: {
    navbar
  }
}
</script>
