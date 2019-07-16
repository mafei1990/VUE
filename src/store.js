import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let loginState = {
  namespaced: true,
  state: {
    isLogin: false,
    username: "",
    loginTime: 0
  },
  mutations: {
    logIn(state, username) {
      state.isLogin = true;
      state.username = username;
      state.loginTime = new Date().getTime();
      for (let key in state) {
        localStorage.setItem(key, state[key]);
      }
      console.log(state);
    },
    logOut(state) {
      state.isLogin = false;
      state.username = "";
      for (let key in state) {
        localStorage.setItem(key, state[key]);
      }
    }
  }
};

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    loginState: loginState
  }
});
