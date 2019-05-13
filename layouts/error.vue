<template lang="pug">
  v-layout(justify-center wrap)
    v-flex(
      id="error"
      md6
      xs11
      my-3
      wrap
    )
      v-card.box
        // Ghost
        .ghost
          - for (let i = 0; i < 6; i += 1)
            .ghost-symbol

          .ghost-body
            .eyes(:style="eyesStyle")
              .eye-left
              .eye-right

            .foot
              - for (let i = 0; i < 5; i += 1)
                .block

          .ghost-shadow

        // Description
        .description
          .description-container
            .description-title
              | Oops!
            .description-text
              | {{ message }}
          // Button
          v-layout(justify-center wrap)
            v-flex(xs12 wrap)
              v-btn(
                class="description-button"
                color="accent"
                round
                :to="localePath('index')"
                nuxt
                exact
                @click="transiTo"
              )
                | Go back
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { Error } from '@/models/error';

@Component
export default class ErrorPage extends Vue {
  // Props
  @Prop({ type: Object, default: null }) readonly error?: Error;

  // Data
  eyesStyle = '';

  // Computed

  /**
   * Error message
   */
  get message(): string {
    if (this.error != null && this.error.statusCode === 404) {
      return 'Sorry! We could not find the page you were looking for. You can return to our home page.';
    } else {
      return 'Some errors occurred. I must be punished for this unacceptable failure!';
    }
  }

  // Method

  /**
   * Make eyes follow cursor
   */
  mousemove(event): void {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const x = (event.clientX / winWidth) * 100 - 100;
    const y = ((winHeight / 2 - event.clientY) / winHeight) * -300;
    this.eyesStyle = `transform: translate(${x}%, ${y}%);`;
  }

  /**
   * Reload if on index page
   */
  transiTo() {
    const path = this.$route.path;
    if (path === '/') {
      this.$router.go(0);
    }
  }

  // Hooks
  mounted() {
    document.addEventListener('mousemove', this.mousemove);
  }

  beforeDestroy() {
    document.removeEventListener('mousemove', this.mousemove);
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
$box-color = #332F63
$ghost-color = #FFF
$shadow-color = #3B3769
$text-color = #8C8AA7

#error
  height 450px

  .box
    background-color $box-color
    width 100%
    height 450px
    padding 30px 50px
    border-radius 8px

    // Ghost
    .ghost
      padding 15px 25px 25px
      position absolute
      top 30%
      left 50%
      transform translate(-50%, -30%)

      // Ghost symbol
      &-symbol
        &:nth-child(1)
          opacity .2
          animation shine 4s ease-in-out 3s infinite
          &:before, &:after
            content ''
            width 12px
            height 4px
            border-radius 5px
            background-color $ghost-color
            position absolute
            bottom 65px
            left 0
          &:before
            transform rotate(45deg)
          &:after
            transform rotate(-45deg)
        &:nth-child(2)
          width 18px
          height 18px
          border 4px solid $ghost-color
          border-radius 50%
          position absolute
          top 30px
          left -5px
          opacity .2
          animation shine 4s ease-in-out 1.3s infinite
        &:nth-child(3)
          opacity .2
          animation shine 3s ease-in-out .5s infinite
          &:before, &:after
            content ''
            width 12px
            height 4px
            border-radius 5px
            background-color $ghost-color
            position absolute
            top 5px
            left 40px
          &:before
            transform rotate(90deg)
          &:after
            transform rotate(180deg)
        &:nth-child(4)
          opacity .2
          animation shine 6s ease-in-out 1.6s infinite
          &:before, &:after
            content ''
            width 15px
            height 4px
            border-radius 5px
            background-color $ghost-color
            position absolute
            top 10px
            right 30px
          &:before
            transform rotate(45deg)
          &:after
            transform rotate(-45deg)
        &:nth-child(5)
          width 12px
          height 12px
          border 3px solid $ghost-color
          border-radius 50%
          position absolute
          top 40px
          right 5px
          opacity .2
          animation shine 1.7s ease-in-out 7s infinite
        &:nth-child(6)
          opacity .2
          animation shine 2s ease-in-out 6s infinite
          &:before, &:after
            content ''
            width 15px
            height 4px
            border-radius 5px
            background-color $ghost-color
            position absolute
            bottom 65px
            right -5px
          &:before
            transform rotate(90deg)
          &:after
            transform rotate(180deg)

      // Ghost body
      &-body
        background-color $ghost-color
        width 100px
        height 100px
        margin 0 auto
        border-radius 100px 100px 0 0
        position relative
        animation upndown 3s ease-in-out infinite

        // Eyes
        .eyes
          position absolute
          top 45%
          left 50%
          width 70px
          height 12px
          .eye-left, .eye-right
            width 12px
            height 12px
            border-radius 50%
            margin 0 10px
            background-color $box-color
            position absolute
          .eye-left
            left 0
          .eye-right
            right 0

        // Foot
        .foot
          display flex
          position absolute
          top 100%
          left 0
          right 0
          .block
            flex-grow 1
            height 20px
            border-radius 100%
            background-color $ghost-color
            position relative
            top -10px
            &:nth-child(2n)
              top -12px
              margin 0 -0px
              border-top 15px solid $box-color
              background-color transparent

      // Ghost shadow
      &-shadow
        height 20px
        margin 0 auto
        box-shadow 0 50px 15px 5px $shadow-color
        animation smallnbig 3s ease-in-out infinite

    // Error description
    .description
      position absolute
      bottom 35px
      left 50%
      transform translateX(-50%)

      // Text
      &-container
        min-width 300px
        max-width 400px
        margin 0 auto
        color $ghost-color
        text-align center
        .description-title
          font-size 24px
          letter-spacing .5px
        .description-text
          color $text-color
          line-height 20px
          margin-top 20px

      // Button
      .description-button
        width 100%
        height 50px
        line-height 50px
        font-size 16px
        margin 25px 0 0 0

// Animation keyframes
@keyframes shine
  0%
    opacity .2
  25%
    opacity .1
  50%
    opacity .2
  100%
    opacity .2

@keyframes upndown
  0%
    transform translateY(5px)
  50%
    transform translateY(15px)
  100%
    transform translateY(5px)

@keyframes smallnbig
  0%
    width 90px
  50%
    width 100px
  100%
    width 90px
</style>
