<template>
  <div class="my-32">
    <ul class="text-center">
      <li v-for="nav in navigation">
        <h1 class="swing-in-top-fwd work-item text-5xl">
          <nuxt-link :to="nav.link">{{ nav.title }}</nuxt-link>
        </h1>
      </li>
    </ul>
  </div>
</template>
<script>
  import values from 'lodash-es/values'
  import NavItem from "@/constant/navItem";
  export default {
    computed: {
      navigation() {
        return values(this.$store.state.work.items).map((w, index) => new NavItem(w))
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
    transition: transform 0.3s cubic-bezier(0.345, 0, 0, 1),
    opacity 0.6s cubic-bezier(0.345, 0, 0, 1);
  }

  .work-item:hover a {
    transform: skewX(-15deg) !important;
  }
</style>
