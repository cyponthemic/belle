<template>
  <div class="container mx-auto my-32 px-3" v-if="story && story.content">
    <section class="m-nav w-full max-w-3xl mx-auto text-center text-black" v-editable="story.content">
      <h1 class="text-xl mt-6 uppercase font-sans" v-html="story.name"></h1>
      <IWQuote v-if="story.content.quote" :quote="story.content.quote"></IWQuote>
      <div class="blok lg:flex justify-between mb-4 text-left pb-6">
        <div class="w:full lg:w-1/4 lg:mr-5">
          <div>
            <h3 class="text-mono ">In Brief</h3>
            <div class="wysiwyg text-lg" v-html="marked(story.content.in_brief)"></div>
          </div>

          <div>
            <h3 class="text-mono ">In Theory</h3>
            <div class="wysiwyg text-lg" v-html="marked(story.content.in_theory)"></div>
          </div>
        </div>
        <div class="w-full lg:w-3/5">
          <div>
            <h3 class="text-mono ">In Practice</h3>
            <div class="wysiwyg text-lg" v-html="marked(story.content.in_practice)"></div>
          </div>


        </div>
      </div>
      <div class="blok lg:flex justify-between mb-4 text-left pb-6">
        <div class="ml-auto w-full">
          <component :key="blok._uid" v-for="blok in story.content.body"
                     :blok="blok" :is="blok.component"></component>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import marked from 'marked'
  import get from 'lodash-es/get'
  import storyblokLivePreview from '@/mixins/storyblokLivePreview'
  import IWQuote from "@/components/IWQuote";

  export default {
    mixins: [storyblokLivePreview],

    components: {IWQuote},

    computed: {
      story() {
        return this.$store.state.work.items[this.slug];
      }
    },

    methods: {
      marked(value) {
        return marked(value)
      }
    },
    mounted() {
      if (!get(this.story, 'content.background_color')) return
      this.$store.commit('colors/update', {
        key: 'background',
        value: get(this.story, 'content.background_color')
      })
    },

    destroyed() {
      if (!get(this.story, 'content.background_color')) return
      this.$store.commit('colors/reset', 'background')
    },
    async fetch(context) {
      if (context.store.state.work.items[context.params.slug]) return

      let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
      let endpoint = `cdn/stories/work/${context.params.slug}`

      return context.app.$storyapi.get(endpoint, {
        version: version,
        cv: context.store.state.cacheVersion
      }).then((res) => {
        return context.store.commit('work/add', res.data.story)
      }).catch((res) => {
        if (res.response) {
          context.error({statusCode: res.response.status, message: res.response.data})
        }
      })
    },
    asyncData(context) {
      return {
        slug: context.params.slug
      }
    }
  }
</script>
