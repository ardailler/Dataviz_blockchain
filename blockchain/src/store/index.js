import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    showNav: false
  },
  getters: {
    allData: state => {
      return state
    }
  },
  mutations: {
    showNav (state, bool) {
      state.showNav = bool
    }
  },
  actions: {
    showNav (context, bool) {
      context.commit('showNav', bool)
    }
  }
})

export default store
