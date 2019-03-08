<template>
  <v-layout justify-center row wrap pt-5>
    <the-login-form />
  </v-layout>
</template>

<script>
import TheLoginForm from '@/components/TheLoginForm';

export default {
  components: {
    TheLoginForm,
  },
};
</script>
