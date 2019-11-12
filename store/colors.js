import lightOrDark from "@/constant/darkOrLight";

const original = {
  primary: '#cd6440',
  secondary: '#e3c4e2',
  background: '#e3c4e2'
}

export const state = () => {
  return {
    primary: '#cd6440',
    secondary: '#e3c4e2',
    background: '#e3c4e2'
  }
}

export const getters = {
  backgroundContrast(state) {
    return 'text-' + lightOrDark(state.background)
  },
}

export const mutations = {
  update(state, {key, value}) {
      state[key] = value
  },

  reset(state, key) {
    state.key = original.key
  }
}
