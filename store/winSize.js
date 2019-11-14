export const state = () => {
  return {
    width: 0,
    height: 0
  }
}

export const actions = {
  update({commit}, payload) {
    commit('update', payload)
  }
}

export const mutations = {
  update(state, payload) {
      state = payload
  }
}
