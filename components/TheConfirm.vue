<template>
  <v-dialog v-model="dialog" max-width="420px" lazy>
    <v-card>
      <v-card-title class="subheading font-weight-bold">
        {{ title }}
      </v-card-title>

      <v-card-text class="pt-0">
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn color="success" small flat @click="agree">
          {{ $t('dialog.agree') }}
        </v-btn>

        <v-btn color="error" small flat @click="cancel">
          {{ $t('dialog.cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      title: '',
      message: '',
      resolve: null,
    };
  },

  methods: {
    show(title, message) {
      this.title = title;
      this.message = message;
      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
      });
    },

    agree() {
      if (!this.resolve) {
        return;
      }
      this.resolve(true);
      this.dialog = false;
    },

    cancel() {
      if (!this.resolve) {
        return;
      }
      this.resolve(false);
      this.dialog = false;
    },
  },
};
</script>
