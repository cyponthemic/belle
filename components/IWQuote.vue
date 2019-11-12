<template>
  <h1 ref="title" class="text-5xl my-6 font-serif" v-if="quote" v-html="quote"></h1>
</template>
<script>
  import charming from "charming";

  export default {
    props: {
      quote: {
        type: String,
        default: ''
      },
    },

    mounted() {
      charming(this.$refs.title, {
        tagName: "span"
      });
    }
  }
</script>
