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

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class VConfirm extends Vue {
  // Data
  dialog = false;
  title = '';
  message = '';
  resolve?: (value: boolean) => void;
  reject?: (reason?) => void;

  // Computed
  get defaultTitle(): string {
    return this.$i18n.t('dialog.title') as string;
  }

  // Methods
  show(message: string, title = this.defaultTitle): Promise<boolean> {
    this.title = title;
    this.message = message;
    this.dialog = true;
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  agree(): void {
    if (!this.resolve) {
      return;
    }
    this.resolve(true);
    this.dialog = false;
  }

  cancel(): void {
    if (!this.reject) {
      return;
    }
    this.reject(false);
    this.dialog = false;
  }
}
</script>
