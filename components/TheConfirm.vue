<template>
  <v-dialog v-model="dialog" max-width="420px" lazy>
    <v-card>
      <v-card-title>
        <v-icon color="warning" large left>
          fas fa-exclamation-circle
        </v-icon>
        <v-flex class="subheading font-weight-bold" tag="span">
          {{ title }}
        </v-flex>
      </v-card-title>

      <v-card-text class="pt-0">
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn color="success" small outline @click="agree">
          {{ $t('dialog.agree') }}
        </v-btn>

        <v-btn color="error" small outline @click="cancel">
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
      title: this.$i18n.t('dialog.title'),
      message: '',
      resolve: null,
    };
  },

  methods: {
    show(title, message) {
      if (title) {
        this.title = title;
      }
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
