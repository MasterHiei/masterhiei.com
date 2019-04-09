<template>
  <v-layout justify-center row wrap pt-5>
    <the-login-form />
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    TheLoginForm: () => import('@/components/TheLoginForm.vue'),
  },
})
export default class LoginPage extends Vue {}
</script>
