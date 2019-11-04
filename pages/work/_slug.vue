<template>
  <section class="m-nav w-100 h-100 text-center">
    <h1 class="text-5xl	text-white mt-6 capitalize" v-html="page"></h1>
    <style>
      :root {
        --secondary: #4a8071;
      }
    </style>
  </section>
</template>
<script>
  export default {
    async asyncData({params, payload, error}) {
      return {
        page: params.slug
      }
    }
  }
</script>
