<template>
  <div class="container mx-auto">
    <section class="m-nav w-100 h-100 text-center text-black" v-editable="story.content">
      <h1 class="text-xl mt-6 uppercase font-sans" v-html="story.name"></h1>
      <IWQuote :quote="story.content.quote"></IWQuote>
      <div class="flex mb-4 text-left max-w-5xl mx-auto">
        <div class="w-1/4 mr-5">
          <div>
            <h3 class="text-xl mt-6 uppercase">In Brief</h3>
            <div v-html="inBrief"></div>
          </div>

          <div>
            <h3 class="text-xl mt-6 uppercase">In Theory</h3>
            <div v-html="inTheory"></div>
          </div>
        </div>
        <div >
          <div>
            <h3 class="text-xl mt-6 uppercase">In Practice</h3>
            <div v-html="inPractice"></div>
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

    computed: {
      inBrief () {
        if(!this.story.content.in_brief) return
        return marked(this.story.content.in_brief || '')
      },
      inTheory () {
        if(!this.story.content.in_theory) return
        return marked(this.story.content.in_theory || '')
      },
      inPractice() {
        if(!this.story.content.in_practice) return
        return marked(this.story.content.in_practice || '')
      }
    },

    mounted() {
      this.$store.commit('colors/update', {
        key: 'background',
        value: this.story.content.background_color
      })
    },

    destroyed() {
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
