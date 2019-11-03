<template>
  <section class="w-100 h-100">
    <h1 class="grid" ref="title">Isabella</h1>
  </section>
</template>

<script>
import charming from "charming";
export default {
  mounted() {
    this.$nextTick(() => {
      const title = this.$refs.title;
      charming(title, {
        tagName: "span"
      });
    });
  }
};
</script>

<style scoped>
</style>
