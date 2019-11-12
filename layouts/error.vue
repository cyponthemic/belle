<template>
  <div class="container mx-auto">
    <div class="flex justify-center items-center w-full h-100vh">
      <div class="text-center max-w-2xl text-4xl">
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
        <nuxt-link to="/" class="uppercase text-mono text-sm hover:underline">back to home</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'blog' // you can set a custom layout for the error page
  }
</script>


<style>
  .h-100vh {
    height: 100vh;
  }
</style>
