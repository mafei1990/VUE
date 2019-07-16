import router from "../router";
import api from "./api";
const evt = () => {
  router.beforeResolve((to, from, next) => {
    if (to.matched.some(d => d.meta.requiresAuth)) {
      api
        .isLogin()
        .then(() => {
          next();
        })
        .catch(() => {
          next({
            name: "login",
            params: {
              redirectUrl: to.fullPath
            }
          });
        });
    } else {
      next();
    }
  });
};

export default evt;
