<template lang="pug">
  v-footer(id="footer" height="auto")
    v-card(color="transparent" width="100%" flat tile)
      v-card-text(class="footer-text")
        | {{ `&copy;&nbsp;${year}&nbsp;` }}
        a(href="")
          | MasterHiei
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TheFooter extends Vue {
  // Computed
  get year(): string {
    const year = new Date().getFullYear();
    return year > 2019 ? `2019-${year}` : '2019';
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#footer
  background-color transparent
  .footer-text
    text-align center
    padding 0 0 24px 0
    font-size 12px
    color var(--v-secondary-darken2)
    a
      color var(--v-secondary-darken2)
      &:hover
        text-decoration underline
</style>
