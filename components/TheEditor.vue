<template>
  <no-ssr>
    <mavon-editor
      id="mavon-editor"
      v-model="content"
      class="justify-center"
      :value="defaultValue"
      :tab-size="Number(2)"
      :language="language[this.$i18n.locale] || 'en'"
      default-open="edit"
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
    defaultValue: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      content: '',

      language: {
        'zh-CN': 'zh-CN',
        'ja-JP': 'ja',
      },
    };
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#mavon-editor
  height 100%
  margin-top 1px
  z-index 100
</style>
