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

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
mavonEditor.getMarkdownIt();

export default {
  components: {
    mavonEditor,
  },

  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
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
