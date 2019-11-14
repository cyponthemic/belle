<template>
  <div class="my-32 relative">
    <client-only>
      <ul class="text-center">
        <li v-for="nav in navigation">
          <WorkNavigationItem
            :item="nav"
            :mousePos="mousePos"
            :lastMousePos="lastMousePos"
            @ready="initEvents"
          ></WorkNavigationItem>
        </li>
      </ul>
      <svg ref="svg" class="fixed distort" width="350" height="450" viewBox="0 0 350 450">
        <filter id="distortionFilter">
          <feTurbulence
            type="turbulence" baseFrequency="0.07 0.01" numOctaves="5" seed="2" stitchTiles="stitch" x="0%"
            y="0%" width="100%" height="100%" result="noise"></feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" x="0%"
            y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse"></feDisplacementMap>
        </filter>
        <g filter="url(#distortionFilter)">
          <img class="distort__img" x="50" y="50" xlink:href="https://source.unsplash.com/random/250x350" height="350" width="250"/>
        </g>
      </svg>
    </client-only>
  </div>
</template>
<style>
  .distort {
    outline: 1px solid red;
    pointer-events: none;
    will-change: transform;
  }

</style>
<script>
  import values from 'lodash-es/values'
  import NavItem from "@/constant/navItem";
  import WorkNavigationItem from "@/components/WorkNavigation/WorkNavigationItem";
  import {distance, getMousePos, lerp, lineEq} from "@/constant/animation";

  export default {
    data() {
      return {
        eventInitiated: false,
        items: [],
        dmScale: 0,
        feDisplacementMapEl: {},
        lastMousePos: {
          translation: {
            x: 0,
            y: 0
          },
          displacement: {
            x: 0,
            y: 0
          }
        },
        mousePos: {
          x: 0,
          y: 0
        }
      }
    },
    components: {WorkNavigationItem},
    computed: {
      winSize() {
        return this.$store.state.winSize
      },
      navigation() {
        return this.$store.getters['work/navigation']
      }
    },

    methods: {
      initEvents() {
        if(this.eventInitiated) return

        console.log('init')
        this.eventInitiated = true;

        this.$nextTick(()=>{
          window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));

          this.items = this.$children.filter(c => c.$options._componentTag === "WorkNavigationItem")
          this.feDisplacementMapEl = document.querySelector('feDisplacementMap');

          const calcWinsize = () => {
            const payload = {width: window.innerWidth, height: window.innerHeight};
            this.$store.dispatch('winSize/update', payload)
          }

          calcWinsize();
          window.addEventListener('resize', calcWinsize);
          this.render()
        })
      },

      render() {
        this.lastMousePos.translation.x = lerp(this.lastMousePos.translation.x, this.mousePos.x, 0.2);
        this.lastMousePos.translation.y = lerp(this.lastMousePos.translation.y, this.mousePos.y, 0.2);
        this.$refs.svg.style.transform = `translateX(${(this.lastMousePos.translation.x - this.winSize.width / 2)}px) translateY(${this.lastMousePos.translation.y - this.winSize.height / 2}px)`;

        // Scale goes from 0 to 50 for mouseDistance values between 0 to 140
        this.lastMousePos.displacement.x = lerp(this.lastMousePos.displacement.x, this.mousePos.x, 0.1);
        this.lastMousePos.displacement.y = lerp(this.lastMousePos.displacement.y, this.mousePos.y, 0.1);
        const mouseDistance = distance(this.lastMousePos.displacement.x, this.mousePos.x, this.lastMousePos.displacement.y, this.mousePos.y);
        this.dmScale = Math.min(lineEq(50, 0, 140, 0, mouseDistance), 50);
        this.feDisplacementMapEl.scale.baseVal = this.dmScale;

        requestAnimationFrame(() => this.render());
      }
    },

    mounted() {
      this.$store.dispatch('work/fetch', this)
    }
  }
</script>
<style>
  .work-item {

    text-transform: none;
    line-height: 1.23;

  }

  .work-item a {
    position: relative;
    display: inline-block;
    /*transition: transform 0.3s cubic-bezier(0.345, 0, 0, 1),*/
    /*opacity 0.6s cubic-bezier(0.345, 0, 0, 1);*/
  }

  .work-item:hover a {
    /*transform: skewX(-15deg) !important;*/
  }
</style>
