<template>
  <section class="w-full h-full">
    <TypoGrid class="invisible md:visible grid--layout-1"></TypoGrid>
    <WorkNavigation class="block md:hidden"></WorkNavigation>
  </section>
</template>

<script>

  import TypoGrid from "../components/TypoGrid";
  import WorkNavigation from "@/components/WorkNavigation";


  export default {
    components: {
      TypoGrid,
      WorkNavigation
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
