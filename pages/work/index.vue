<template>
  <WorkNavigation></WorkNavigation>
</template>

<script>
  import WorkNavigation from "@/components/WorkNavigation";

  export default {
    components: { WorkNavigation },

    mounted() {
      this.$store.commit('colors/update', {
        key: 'background',
        value: '#FEF7EA'
      })
    },

    destroyed() {

    },
  }
</script>
