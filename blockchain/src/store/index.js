import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    showNav: false,
    slideName: '',
    switchConso: false
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
    },
    switchConso (state) {
      state.switchConso = !state.switchConso
    }
  },
  actions: {
    showNav (context, bool) {
      context.commit('showNav', bool)
    },
    slideName (context, name) {
      context.commit('slideName', name)
    },
    switchConso (context) {
      context.commit('switchConso')
    }
  }
})

export default store
