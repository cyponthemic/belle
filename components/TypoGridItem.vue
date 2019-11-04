<template>
  <nuxt-link :to="nav.link" class="nav-item relative text-center"
             ref="item"

  >

    <h1 class="swing-in-top-fwd nav-item-letter absolute inset-x-0" ref="letter" :style="letterStyle"> {{ nav.letter }}</h1>
    <transition name="fade-in">
      <h1
        class="nav-item-title absolute uppercase" ref="title" :style="mergeStyle(nav.style)"
        v-html="nav.title"></h1>
    </transition>
    <!--          <img v-if="current === index" class="nav-item-image fixed" src="https://www.fillmurray.com/360/640" alt="">-->
  </nuxt-link>
</template>
<script>
  import TweenMax from "gsap/TweenMax";
  import NavItem from "~/constant/navItem";
  import Nearby from "~/constant/nearby";
  import {merge} from "lodash-es";
  import charming from "charming";

  /**
   * Equation of a line.
   */
  const lineEq = (y2, y1, x2, x1, currentVal) => {
    // y = mx + b
    var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
    return m * currentVal + b;
  };

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
          y: 0
        }
      }
    },

    computed: {
      letterStyle() {
        return {
          opacity: 1 - this.visible.title
        }
      },
      style() {
        return {
          opacity: this.visible.title,
          transform: `translate(-${this.offset.x}px ,-${this.offset.y}px)`,
          pointerEvent: this.visible.title < .5 ? 'none' : ''
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


      },

      setOffset() {
        if (!this.$refs.title) return

        const letter = this.$refs.title.children[this.nav.letterIndex]

        if (!letter) return

        this.offset.x = letter.offsetLeft
        this.offset.y = letter.offsetTop
      }

    },
    mounted() {
      new Nearby(this.$el, {
        onProgress: (distance) => {
          const o = lineEq(opacityInterval.from, opacityInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
          if (!this.offset.x && !this.offset.y) this.setOffset();
          if (!this.charming) this.setCharming();

          TweenMax.to(this.visible, .3, {
            title: Math.max(o, opacityInterval.from)
          });

        }
      })
    }
  }
</script>

<style>
  .nav-item {

  }

  .nav-item-title {
    z-index: 1;
    background-color: var(--primary);
    opacity: 0;
  }

</style>
