<template>
  <div class="m-nav">
    <ul class="text-center">
      <li  v-for="nav in navigation">
        <h1 class="swing-in-top-fwd work-item text-5xl">
          <nuxt-link :to="nav.link">{{ nav.title }}</nuxt-link>
        </h1>
      </li>
    </ul>
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
        total: 0, data: { stories: [] },
      }
    },
    computed: {
      navigation() {
        return this.data.stories.map((w,index) => new NavItem(w))
      }
    },

    mounted() {
      this.$store.commit('colors/update', {
        key: 'background',
        value: '#FEF7EA'
      })
    },

    destroyed() {

    },

    asyncData (context) {
      let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

      return context.app.$storyapi.get('cdn/stories', {
        version: version,
        starts_with: `work`,
        cv: context.store.state.storyblok.cacheVersion
      }).then((res) => {
        return res
      }).catch((res) => {
        context.error({ statusCode: res.response.status, message: res.response.data })
      })
    }
  }
</script>
