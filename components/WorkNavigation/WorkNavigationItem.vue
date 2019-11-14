<template>
  <h1 @mouseenter="mouseEnter" @mouseleave="mouseLeave" class="swing-in-top-fwd work-item text-5xl">
    <nuxt-link :to="item.link">
      <span ref="charming">{{ item.title }}</span>
    </nuxt-link>
  </h1>
</template>
<style scoped>
  img {
    opacity: 0;
  }
</style>
<script>
  import charming from "charming";
  import TweenMax from "gsap/umd/TweenMax";
  import {Quad, Sine, Back} from "gsap/umd/EasePack";

  export default {
    props: {
      lastMousePos: {},
      mousePos: {},
      item: {
        type: Object,
        default: () => {
        }
      },
    },
    data() {
      return {
        letters: [],
        visible: false
      }
    },
    methods: {
      mouseEnter() {
        // TweenMax.to(this.$refs.image, 0.5, {ease: Quad.easeOut, opacity: 1});
        // Letters effect
        TweenMax.staggerTo(this.letters, 0.2, {
          ease: Sine.easeInOut,
          y: this.lastMousePos.translation.y < this.mousePos.y ? 30 : -30,
          startAt: {opacity: 1, y: 0},
          opacity: 0,
          yoyo: true,
          yoyoEase: Back.easeOut,
          repeat: 1,
          stagger: {
            grid: [1, this.letters.length-1],
            from: 'center',
            amount: 0.12
          }
        });
      },
      mouseLeave() {
        // TweenMax.set(this.$refs.image, {opacity: 0});
      }
    },
    mounted() {
      this.$emit('ready')
      this.$nextTick(() => {
        charming(this.$refs.charming);
        this.letters = this.$refs.charming.children
      })
    }
  }
</script>
