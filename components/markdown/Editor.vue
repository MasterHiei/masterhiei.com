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
        :language="languages[this.$i18n.locale] || 'en'"
        default-open="edit"
      />
    </no-ssr>

    <v-btn class="mx-0 mt-2" color="success" @click="post">
      {{ $t('post') }}
    </v-btn>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
mavonEditor.getMarkdownIt();

@Component({
  components: {
    mavonEditor,
  },
})
export default class Editor extends Vue {
  // Props
  @Prop({ type: String, default: '' }) readonly placeholder!: string;
  @Prop({ type: String, required: true }) readonly callback!: string;

  // Data
  content = '';
  languages = {
    'zh-CN': 'zh-CN',
    'ja-JP': 'ja',
  };

  // Methods
  post(): void {
    this.$emit(this.callback, this.content);
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#mavon-editor
  height 100%
  width 100%
  z-index 100
</style>
