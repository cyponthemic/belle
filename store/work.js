import forEach from 'lodash-es/forEach'
import mapValues from "lodash-es/mapValues";
import values from "lodash-es/values";
import NavItem from "@/constant/navItem";
import Vue from 'vue';

export const state = () => {
  return {
    items: {},
  }
}

export const actions = {
  fetch(store, context) {
    let version = context.$route.query._storyblok || context.isDev ? 'draft' : 'published'
    context.$storyapi.get('cdn/stories', {
      version: version,
      starts_with: `work`,
      cv: store.rootState.storyblok.cacheVersion
    }).then((res) => {
      return store.commit('create', res.data.stories)
    }).catch((res) => {
      if(res.response) {
        context.$error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  }
}

export const mutations = {
  create(state, items) {
    forEach(items, (item) => {
      Vue.set(state.items, item.slug, item)
    })
  },

  add(state, value) {
    Vue.set(state.items, value.slug, value)
  }
}

export const getters = {
  navigation(state) {
    return values(state.items).map((item, index) => new NavItem(item, index))
      .sort(function(a, b){
        if(a.slug < b.slug) { return -1; }
        if(a.slug > b.slug) { return 1; }
        return 0;
      })
    return mapValues(state.items, function(item, index) { return new NavItem(item, index) })
  }
}
