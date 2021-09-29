const state = () => ({
  memory: {
    timeValues: null
  }
})

const getters = {
  appMemoryTimeValues: state => state.memory.timeValues
}

const mutations = {
  addMemoryTimeValue (state, payload) {
    payload = Array.isArray(payload) ? payload : [payload]

    if (state.memory.timeValues) {
      state.memory.timeValues.push(...payload)
    } else {
      state.memory.timeValues = payload
    }
  },
  clearMemoryTimeValue (state) {
    state.memory.timeValues = null
  }
}

const actions = {}

export const memory = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
