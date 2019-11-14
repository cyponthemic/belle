import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// You can do the same for getters, mutations and states
import list from '~/store/list'
import colors from '~/store/colors'

let store = new Vuex.Store({
  modules: {
    list: {
      namespaced: true,
      ...list
    },
    colors: colors
  }
})
/**
 Bind Axios to Store as we don't have access to Nuxt's $axios instance here. See caveat below.
 **/
store.$axios = axios
store.$axios.$get = axios.get

export default store
