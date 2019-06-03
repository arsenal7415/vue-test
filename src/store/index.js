import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    token: '111',
    url: ''
  },
  mutations: {
    setUrl(state, parames) {
      state.url = parames.url
    }
  },
});

export default store;
