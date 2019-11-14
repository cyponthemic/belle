<template>
  <div class="wysiwyg my-3" v-editable="blok" v-html="body">
  </div>
</template>
<script>
  import marked from 'marked'
  export default {
    props: ['blok'],
    computed: {
      body() {
        if(!this.blok.Body) return ''
        return marked(this.blok.Body);
      }
    },
    }
</script>
