import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  routerList: null
};

const getters  = {
  routerList: state => state.routerList
};

const mutations = {
  routerList: (state,router) => {
    if (router) {
      state.routerList = router
    } else if (router === null) {
      state.routerList = null
    }
  }
};

const actions = {
  setRouter: ({commit},router) => {
    commit('routerList',router)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})