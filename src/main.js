import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import routerEvt from "./utils/routerEvt.js";
import store from "./store";
import popup from "./components/popup.js";

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
Vue.use(popup);

routerEvt();
