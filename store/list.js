export const state = () => {
  return {
    users: [],
    comments: [],
  }
}

export const actions = {
  GET_USERS({commit}) {
    this.$axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        console.log('res', res.data)
        commit('ADD_USERS', res.data)
      })
      .catch(err => {
        console.log('API error')
        console.log(err)
      })
  },
  GET_COMMENTS({commit}) {
    this.$axios.get(`https://jsonplaceholder.typicode.com/comments`)
      .then(res => {
        console.log('res', res.data)
        commit('ADD_COMMENTS', res.data)
      })
      .catch(err => {
        console.log('API error')
        console.log(err)
      })
  },
}


export const mutations = {
  ADD_COMMENTS(state, payload) {
    state.comments = payload
  },
  ADD_USERS(state, payload) {
    state.users = payload
  }
}

export default {
  mutations: mutations,
  actions: actions,
  state: state
}
