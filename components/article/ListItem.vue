<template lang="pug">
  v-hover
    v-card(
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 8 : 2}`"
        to="#"
      )
        v-img(:src="article.image")

        post-date-time(:datetime="article.created_at")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { distanceInWordsToNow } from 'date-fns';
import zh_cn from 'date-fns/locale/zh_cn';
import ja from 'date-fns/locale/ja';

@Component({
  components: {
    PostDateTime: () => import('./Datetime.vue'),
  },
})
export default class ListItem extends Vue {
  // Props
  @Prop({ type: Object, required: true })
  readonly article!: Record<string, string>;

  // Computed
  get loadingImage(): string {
    return `${process.env.DOMAIN}/public/loading/spin.svg`;
  }

  get locales() {
    return {
      'zh-CN': zh_cn,
      'ja-JP': ja,
    };
  }

  get distanceToNow(): string {
    return distanceInWordsToNow(this.article.created_at, {
      addSuffix: true,
      locale: this.locales[this.$i18n.locale],
    });
  }

  get summary(): string {
    const content = this.article.content;
    if (content.length <= 120) return content;
    return `${this.article.content.slice(0, 120)}...`;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.post-datetime
  position absolute
  top 20px
  right 20px
  &>span
    display block
  &>.day
    margin-bottom 1px
  &>.month
    font-size 13px
</style>
