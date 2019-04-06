<template>
  <v-flex wrap>
    <no-ssr>
      <mavon-editor
        :value="content"
        class="mavon-preview justify-center"
        :tab-size="Number(2)"
        :box-shadow="false"
        :toolbars-flag="false"
        :subfield="false"
        default-open="preview"
      />
    </no-ssr>
  </v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
mavonEditor.getMarkdownIt();

@Component({
  components: {
    mavonEditor,
  },
})
export default class TheMarkdownView extends Vue {
  // Props
  @Prop({ type: String, required: true }) readonly content!: string;
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.mavon-preview
  height 100%
  width 100%
  min-height 0
  min-width 0
  z-index 1

>>>.v-note-panel
  border-style none !important

>>>.v-show-content
  padding 0 !important
</style>
