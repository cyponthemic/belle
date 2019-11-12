import forEach from 'lodash-es/forEach'
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
        state.items[item.slug] = item
    })
  },

  add(state, value) {
    state.items[value.slug] = value
  }
}
