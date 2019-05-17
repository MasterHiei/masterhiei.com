<template>
  <v-layout justify-center row wrap pt-5>
    <v-login-form />
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {
    VLoginForm: () => import('@/components/ui/VLoginForm.vue'),
  },
})
export default class LoginPage extends Vue {}
</script>
