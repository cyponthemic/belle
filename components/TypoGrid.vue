<template>
  <div class="grid fixed top-0 w-100 h-100">
    <TypoGridItem
      :key="nav.link"
      v-for="(nav, index) in navigation"
      :nav="nav"
    ></TypoGridItem>
    <div :class="{'visible' : current > -1}" class="overlay absolute w-100 h-100 t-0"></div>
  </div>
</template>
<style>
  .overlay {
    pointer-events: none;
    background: var(--primary);
    opacity: 0;
    z-index: 0;
  }

  .nav-item:hover ~ .overlay {
    opacity: .6;
  }
</style>
<script>
  import work from "~/constant/work";
  import {debounce} from "lodash-es";

  import NavItem from "../constant/navItem";
  import TypoGridItem from "./TypoGridItem";



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
