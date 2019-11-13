<template>
  <img  class="w-100" :src="blok.source" v-editable="blok" alt="">
</template>
<script>
  import marked from 'marked'
  export default {
    props: ['blok']
  }
</script>
<style scoped>
  .videoWrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    padding-top: 25px;
    height: 0;
  }
  .videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
