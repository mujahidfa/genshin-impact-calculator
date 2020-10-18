import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    normalDMGBeforeReduction: 1,
    critDMGBeforeReduction: 1,
    averageDMGBeforeReduction: 1,
    critRate: 0,
    critDMG: 0,
  },
  mutations: {},
  actions: {},
  modules: {},
  // plugins: [createPersistedState()],
});
