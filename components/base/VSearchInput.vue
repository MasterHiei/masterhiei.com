<template>
  <v-flex fill-height wrap>
    <v-flex fill-height wrap>
      <v-btn flat @click="show = true">
        <v-icon small>fas fa-search</v-icon>
      </v-btn>
    </v-flex>

    <v-flex v-show="show" fill-height wrap>
      <v-text-field
        v-model="text"
        prepend-icon="fas fa-search"
        @blur="show = false"
      />
    </v-flex>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class VSearchInput extends Vue {
  // Data
  text = '';
  show = false;
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
>>>.v-input__icon--prepend .v-icon
  font-size 16px
  // margin-top 4px
  margin-left 12px
</style>
