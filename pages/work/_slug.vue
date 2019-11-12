<template>
  <section class="m-nav w-100 h-100 text-center text-black" v-editable="story.content">
    <h1 class="text-5xl mt-6 capitalize" v-html="story.name"></h1>

    <h2 class="text-3xl mt-6 capitalize" v-if="story.content.quote" v-html="story.content.quote">

    </h2>

    <div class="flex mb-4 text-left max-w-5xl mx-auto">
      <div class="w-1/4">
        <div>
          <h3 class="text-xl mt-6">In Brief</h3>
          <div v-html="inBrief"></div>
        </div>

        <div>
          <h3 class="text-xl mt-6">In Theory</h3>
          <div v-html="inTheory"></div>
        </div>
      </div>
      <div >
        <div>
          <h3 class="text-xl mt-6">In Practice</h3>
          <div v-html="inPractice"></div>
        </div>
      </div>
    </div>

    <style>
      :root {
        --secondary: {{ story.content.background_color || '#4a8071' }};
      }
    </style>
  </section>
</template>
<script>
  import marked from 'marked'
  import storyblokLivePreview from '@/mixins/storyblokLivePreview'

  export default {
    mixins: [storyblokLivePreview],

    computed: {
      inBrief () {
        return marked(this.story.content.in_brief)
      },
      inTheory () {
        return marked(this.story.content.in_theory)
      },
      inPractice() {
        return marked(this.story.content.in_practice)
      }
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
