import Vue from "vue";
import Router from "vue-router";
import index from "./views/index.vue";
//import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/About.vue"),
      children: [{
        path: "us",
        alias: "",
        component: () =>
          import( /* webpackChunkName: "abtUs" */ "./views/about/us.vue")
      }]
    },
    {
      path: "/account",
      name: "account",
      meta: {
        requiresAuth: true
      },
      component: () =>
        import( /* webpackChunkName: "account" */ "./views/account.vue"),
      children: [{
          path: "index",
          alias: "",
          component: () =>
            import( /* webpackChunkName: "acntIndex" */ "./views/account/index.vue")
        },
        {
          path: "manage",
          name: "manage",
          component: () =>
            import( /* webpackChunkName: "acntManage" */ "./views/account/manage.vue")
        },
        {
          path: "invests",
          name: "invests",
          component: () =>
            import( /* webpackChunkName: "acntInvests" */ "./views/account/invests.vue")
        },
        {
          path: "welfare",
          name: "welfare",
          component: () =>
            import( /* webpackChunkName: "acntWelfare" */ "./views/account/welfare.vue")
        }
      ]
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import( /* webpackChunkName: "login" */ "./views/login.vue")
    }
  ]
});
