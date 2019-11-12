<template>
  <section class="w-100 h-100">
    <TypoGrid class="grid--layout-1"></TypoGrid>
  </section>
</template>

<script>

  import TypoGrid from "../components/TypoGrid";


  export default {
    components: {
      TypoGrid
    },
    mounted() {
      this.$store.commit('colors/update', {
        key: 'background',
        value: '#cd6440'
      })
    },

    destroyed() {
      this.$store.commit('colors/reset', 'background')
    },

  };
</script>

<style scoped>
</style>
