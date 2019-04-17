<template>
  <v-layout justify-center row wrap pt-5>
    <v-register-form />
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    VRegisterForm: () => import('@/components/ui/VRegisterForm.vue'),
  },
})
export default class RegisterPage extends Vue {}
</script>
