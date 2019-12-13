import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    showNav: false,
    slideName: ''
  },
  getters: {
    allData: state => {
      return state
    }
  },
  mutations: {
    showNav (state, bool) {
      state.showNav = bool
    },
    slideName (state, name) {
      state.slideName = name
    }
  },
  actions: {
    showNav (context, bool) {
      context.commit('showNav', bool)
    },
    slideName (context, name) {
      context.commit('slideName', name)
    }
  }
})

export default store
