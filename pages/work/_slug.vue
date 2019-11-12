<template>
  <div class="container mx-auto pb-6 mb-6" v-if="story.content">
    <section class="m-nav w-100 max-w-4xl mx-auto text-center text-black" v-editable="story.content">
      <h1 class="text-xl mt-6 uppercase font-sans" v-html="story.name"></h1>
      <IWQuote v-if="story.content.quote" :quote="story.content.quote"></IWQuote>
      <div class="flex justify-between mb-4 text-left pb-6">
        <div class="w-1/4 mr-5">
          <div class="wysiwyg">
            <h3 class="text-xl mt-6 text-mono uppercase">In Brief</h3>
            <div v-html="marked(story.content.in_brief)"></div>
          </div>

          <div class="wysiwyg">
            <h3 class="text-xl mt-6 text-mono uppercase">In Theory</h3>
            <div v-html="marked(story.content.in_theory)"></div>
          </div>
        </div>
        <div class="w-1/2">
          <div class="wysiwyg">
            <h3 class="text-xl mt-6 text-mono uppercase">In Practice</h3>
            <div v-html="marked(story.content.in_practice)"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import marked from 'marked'
  import storyblokLivePreview from '@/mixins/storyblokLivePreview'
  import IWQuote from "@/components/IWQuote";

  export default {
    mixins: [storyblokLivePreview],

    components: {IWQuote},

    methods: {
      marked(value) {
        return marked(value)
      }
    },
    mounted() {
      if(!this.story.content.background_color) return
      this.$store.commit('colors/update', {
        key: 'background',
        value: this.story.content.background_color
      })
    },

    destroyed() {
      if(!this.story.content.background_color) return
      this.$store.commit('colors/reset' , 'background')
    },

    asyncData (context) {
      let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
      let endpoint = `cdn/stories/work/${context.params.slug}`

      return context.app.$storyapi.get(endpoint, {
        version: version,
        cv: context.store.state.cacheVersion
      }).then((res) => {
        return res.data
      }).catch((res) => {
        context.error({ statusCode: res.response.status, message: res.response.data })
      })
    }
  }
</script>
