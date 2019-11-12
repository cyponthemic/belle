import routeDefault from './constant/route'

export default {
  /*
   ** Rendering mode
   ** Doc: https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",

  /*
   ** Headers of the page
   ** Doc: https://vue-meta.nuxtjs.org/api/#metainfo-properties
   */
  head: {
    title: "Nuxt.js starter for CSB",
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {
        hid: "description",
        name: "description",
        content: "Official Nuxt.js starter for CodeSandBox"
      }
    ],
    link: [
      {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
      {
        href:
          "https://agencehotelparticulier.com/assets/fonts/Saol_Display_Regular.woff"
      },
      {
        href:
          "https://fonts.googleapis.com/css?family=Work+Sans:300,400&display=swap"
      }
    ]
  },

  /*
   ** Global CSS
   ** Doc: https://nuxtjs.org/api/configuration-css
   */
  css: ["~/assets/main.scss"],

  /*
   ** Plugins to load before mounting the App
   ** Doc: https://nuxtjs.org/guide/plugins
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   ** Doc: https://nuxtjs.org/guide/modules
   */
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    '@nuxtjs/netlify-files',
    ['storyblok-nuxt', {accessToken: 'lVNHPozYedEoxZotaBKjJgtt', cacheProvider: 'memory'}],
    "@nuxt/http",
  ],

  /*
   ** HTTP module configuration
   */
  http: {
    // See https://http.nuxtjs.org/api/#options
  },

  generate: {
    fallback: '200.html',
    // Make a switch to determine if
    // we generate one page or the whole site
    // to generate one page `yarn generate -r /news` for example
    // routes: routeDefault
  },
  /*
   ** Build configuration
   ** Doc: https://nuxtjs.org/api/configuration-build
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: [
      'lodash-es'
    ],
    extend(config, ctx) {
    }
  }
};
