<template>
  <v-flex wrap>
    <v-flex wrap>
      {{ comment }}
    </v-flex>
  </v-flex>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
};
</script>
