export default {
  mounted() {
    console.log('preview')
    this.$storybridge.on(['published', 'change'], (event) => {
      console.log('event')
      if (!event.slugChanged) {
        // Reload the page on save events (publish, save button or autosave)
        this.$nuxt.$router.go({
          path: this.$nuxt.$router.currentRoute,
          force: true
        })
      }
    })
  }
}
