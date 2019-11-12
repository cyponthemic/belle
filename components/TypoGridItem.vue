<template>
  <nuxt-link :to="nav.link" class="nav-item relative text-center"
             ref="item"

  >

    <h1 class="swing-in-top-fwd nav-item-letter absolute inset-y-0 inset-x-0" ref="letter" :style="letterStyle"> {{
      nav.letter }}</h1>
    <h1
      class="nav-item-title absolute uppercase opacity-0" ref="title" :style="mergeStyle(nav.style)"
      v-html="nav.title"></h1>
    <!--          <img v-if="current === index" class="nav-item-image fixed" src="https://www.fillmurray.com/360/640" alt="">-->
  </nuxt-link>
</template>
<script>
  import TweenMax from "gsap/umd/TweenMax";
  import Nearby from "~/constant/nearby";
  import charming from "charming";
  import merge from "lodash-es/merge";
  import {lineEq} from "~/constant/animation";


  const distanceThreshold = {min: 0, max: 50};
  const opacityInterval = {from: 0, to: 1};
  const opacityIntervalInvert = {from: 1, to: 0};

  export default {
    props: {
      nav: {
        type: Object,
        default: () => {
        }
      },
    },

    data() {
      return {
        charming: false,
        visible: {
          title: 0
        },
        offset: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        }
      }
    },

    computed: {
      letterStyle() {
        return {
          color: 'transparent'
        }
      },

      translateX() {
        return (this.offset.x - this.offset.width) * -1
      },

      translateY() {
        return (this.offset.y - 20) * -1
      },

      style() {
        return {
          // opacity: this.visible.title,
          transform: `translate(${this.translateX}px ,${this.translateY}px)`,
          pointerEvent: 'none'
        }
      }
    },
    methods: {
      mergeStyle(style) {
        return merge(style, this.style)
      },

      setCharming() {
        if (!this.$refs.title) return

        charming(this.$refs.title, {
          tagName: "span"
        });

        this.charming = true;

        const letter = this.$refs.title.children[this.nav.letterIndex]

        letter.classList.add('primary');
        this.$refs.title.classList.remove('opacity-0');

      },

      setOffset() {
        if (!this.$refs.title) return

        const letter = this.$refs.title.children[this.nav.letterIndex]

        if (!letter) return

        this.offset.x = letter.offsetLeft
        this.offset.y = letter.offsetTop


        this.offset.width = letter.offsetWidth
        this.offset.height = letter.offsetHeight


      }

    },
    mounted() {
      this.setCharming();
      this.setOffset();
      new Nearby(this.$el, {
        onProgress: (distance) => {
          const o = lineEq(opacityInterval.from, opacityInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
          if (!this.offset.x && !this.offset.y) this.setOffset();
          this.setOffset();

          if (!this.charming) this.setCharming();

          // TweenMax.to(this.visible, .3, {
          //   title: Math.max(o, opacityInterval.from)
          // });

        }
      })
    }
  }
</script>

<style lang="scss">
  .nav-item {
  }

  .nav-item-title {
    z-index: 0;
    pointer-events: none;

    > .primary {
      position: relative;
      z-index: -1;
    }

    > *:not(.primary) {
      transition: opacity 1s;
      opacity: 0;
    }
  }

  .nav-item-letter {
    z-index: 1;
  }

  .nav-item-letter:hover + .nav-item-title {
    z-index: 1;
    background-color: var(--background);
  }

  .nav-item-letter:hover + .nav-item-title > * {
    opacity: 1;
    transition-delay: 0s;
  }
</style>
