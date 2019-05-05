<template lang="pug">
  v-card(id="comments")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';

@Component
export default class VGitalk extends Vue {
  // Props
  @Prop({ type: String, required: true }) readonly id!: string;

  // Hooks
  mounted() {
    const gitalk = new Gitalk({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      repo: process.env.COMMENTS_PEPO,
      owner: process.env.GITHUB_OWNER,
      admin: [process.env.GITHUB_OWNER],
      id: this.id,
      labels: [process.env.COMMENTS_LABEL],
      perPage: Number(process.env.COMMENTS_LIMIT),
    });

    gitalk.render('comments');
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#comments
  padding 4px 50px 30px 50px
  &>>>.gt-meta
    z-index 1
  &>>>.gt-popup
    margin-top .3rem
</style>
