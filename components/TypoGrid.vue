<template>
  <div class="grid top-0 w-full h-full ">
    <TypoGridItem
      :key="nav.link"
      v-for="(nav, index) in navigation"
      :nav="nav"
    ></TypoGridItem>
    <div :class="{'visible' : current > -1}" class="overlay absolute w-full h-full t-0"></div>
  </div>
</template>
<style>
  .overlay {
    pointer-events: none;
    background: var(--background);
    opacity: 0;
    z-index: 0;
    transition: opacity 1s;
  }

  .nav-item:hover ~ .overlay {
    opacity: .8;
  }
</style>
<script>
  import work from "~/constant/work";


  import NavItem from "../constant/navItem";
  import TypoGridItem from "./TypoGridItem";
  import debounce from "lodash-es/debounce";



  export default {
    data() {
      return {
        navigation: [],
        current: -1
      }
    },

    components: {TypoGridItem},

    methods: {
      select: debounce(function (nav, index, hover) {
        if (this.current === index && hover) {
          return
        }
        this.current = hover ? index : -1;
        nav.position();
      }, 100)
    },
    created() {
      this.navigation = work.map((item, index) => new NavItem(item, index))
    },
  }
</script>
