<template>
  <v-layout justify-center row wrap pt-5>
    <login-form />
  </v-layout>
</template>

<script>
import loginForm from '@/components/loginForm/loginForm';

export default {
  components: {
    loginForm,
  },
};
</script>
