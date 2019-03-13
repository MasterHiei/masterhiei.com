<template>
  <no-ssr>
    <mavon-editor
      id="editor"
      v-model="content"
      class="justify-center"
      :tab-size="Number(2)"
      :language="this.$i18n.locale"
    />
  </no-ssr>
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
      default: '',
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#editor
  height 100%
  margin-top 2px
  z-index 100
</style>
