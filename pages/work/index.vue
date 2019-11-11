<template>
  <div class="m-nav">
    <ul class="text-center text-white">
      <li  v-for="nav in navigation">
        <h1 class="swing-in-top-fwd work-item text-5xl">
          <nuxt-link :to="nav.link">{{ nav.title }}</nuxt-link>
        </h1>
      </li>
    </ul>
    <style>
      :root {
        --secondary: #313c80;
      }
    </style>
  </div>
</template>
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
<script>
  import work from "~/constant/work";
  import NavItem from "../../constant/navItem";
  export default {
    data() {
      return {
        navigation: work.map((w,index) => new NavItem(w))
      }
    },
  }
</script>
