<template>
  <div id="app">
    <topbar></topbar>
    <router-view/>
    <div id="footer"></div>
  </div>
</template>
<script>
// const topbar = () => import("@/components/topbar.vue")
import topbar from "@/components/topbar.vue";

export default {
  name: "app",
  components: {
    topbar
  }
};
</script>
<style lang="scss">
@import "@/scss/iconfont/materialdesignicons.scss";
@import "@/theme.scss";
* {
  text-decoration: none;
}
@media (max-width: 480px) {
  html,
  body {
    height: 100vh;
    width: 100vw;
  }
  #app {
    position: relative;
    overflow: hidden;
    padding: 0 0 4rem 0;
  }
}
</style>
