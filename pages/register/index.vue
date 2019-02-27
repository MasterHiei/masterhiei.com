<template>
  <v-layout justify-center row wrap pt-5>
    <register-form />
  </v-layout>
</template>

<script>
import registerForm from '@/components/registerForm/registerForm';

export default {
  components: {
    registerForm,
  },
};
</script>
