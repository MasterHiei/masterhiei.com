<template>
  <v-layout justify-center row wrap pt-5>
    <the-register-form />
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    TheRegisterForm: () => import('@/components/TheRegisterForm.vue'),
  },
})
export default class RegisterPage extends Vue {}
</script>
