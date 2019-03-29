<template>
  <v-flex class="text-xs-right" wrap>
    <no-ssr>
      <mavon-editor
        id="mavon-editor"
        v-model="content"
        class="justify-center"
        :placeholder="placeholder"
        :tab-size="Number(2)"
        :autofocus="false"
        :language="language[this.$i18n.locale] || 'en'"
        default-open="edit"
      />
    </no-ssr>

    <v-btn class="mx-0 mt-2" color="success" @click="post">
      {{ $t('post') }}
    </v-btn>
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
    placeholder: {
      type: String,
      default: '',
    },

    callback: {
      type: String,
      required: true,
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

  methods: {
    post() {
      this.$emit(this.callback, this.content);
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#mavon-editor
  height 100%
  width 100%
  z-index 100
</style>
