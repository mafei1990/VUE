<template>
  <div id="topbar">
    <div class="user hide-lg">
      <div class="columns">
        <div class="left col-6 columns column col-mr-auto"></div>
        <div class="right col-6 columns column col-ml-auto">
          <span class="username" v-if="username">
            <span v-text="`您好，${username}`"></span>
            <i class="usernameInfo">
              <router-link to="/account/manage">账号管理</router-link>
              <span @click="logOut()">退出</span>
            </i>
          </span>
          <span class="unlogin" v-if="!username">
            <router-link to="/reg">注册</router-link>
            <router-link to="/login">登录</router-link>
          </span>
        </div>
      </div>
    </div>
    <div class="nav columns">
      <div class="logo columns column col-4 col-xl-2"></div>
      <div class="columns column col-8 col-xl-10 col-xs-12">
        <router-link class="column col-2 col-lg-3" to="/">
          <i class="mdi mdi-home-outline show-xs"></i>首页
        </router-link>
        <router-link class="column col-2 col-lg-3" to="/about">
          <i class="mdi mdi-chart-areaspline show-xs"></i>我要投资
        </router-link>
        <router-link class="column col-2 col-lg-3" to="/about">
          <i class="mdi mdi-gift show-xs"></i>活动专区
        </router-link>
        <router-link class="column col-2 col-lg-3 hide-lg" to="/about">安全保障</router-link>
        <router-link class="column col-2 col-lg-3 hide-lg" to="/about">关于我们</router-link>
        <router-link class="column col-2 col-lg-3" to="/account">
          <i class="mdi mdi-account-outline show-xs"></i>我的账户
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
export default {
  name: "topbar",
  data: function() {
    return {
      msg: "head loaded",
      username: null
    };
  },
  beforeMount() {
    let username = localStorage.getItem("username");
    this.username = username ? username : null;
  },
  mounted() {},
  methods: {
    logOut: () => {
      api.logout();
    }
  },
  watch: {
    "$store.state.loginState.username": function(nval, oval) {
      this.username = nval;
    }
  }
};
</script>

<style lang="scss" scoped>
#topbar {
  width: 100%;
  background: #fff;
  @include shadow(1);
  z-index: 999;
  .user {
    height: 1.6em;
    line-height: 1.6em;
    background: #fcfcfc;
    & > .columns {
      max-width: 1280px;
      height: 100%;
      margin: 0 auto;
    }
    .right {
      font-size: 0.8em;
      .username {
        position: relative;
        i {
          position: absolute;
          display: none;
          width: 12em;
          top: 1.5em;
          line-height: 2em;
          @include shadow(2);
          background: #fff;
          padding: 0.5em;
          font-style: normal;
          z-index: 999;
          a,
          span {
            display: block;
            cursor: pointer;
          }
        }
        &:hover {
          i {
            display: block;
          }
        }
      }
    }
  }
  .nav {
    max-width: 1280px;
    height: 3em;
    margin: 0 auto;
    line-height: 3em;
    a {
      display: block;
      color: #666;
      text-align: center;
      .crt,
      &:hover,
      &.router-link-exact-active {
        color: $golden;
      }
    }
    .logo {
      height: 100%;
      padding: 0;
      margin: 0;
      background: url("/img/logo.png") center center no-repeat / contain;
    }
  }
}
@media (max-width: 1280px) {
  #topbar {
    .nav {
      .logo {
        background: url("/img/logo_m.png") center center no-repeat / contain;
      }
    }
  }
}
@media (max-width: 480px) {
  #topbar {
    position: fixed;
    bottom: 0;
    .nav {
      width: 100%;
      height: 3rem;
      .logo {
        display: none;
      }
      a {
        font-size: 0.7rem;
        line-height: 0.8rem;
        .iconfont,
        .mdi {
          color: #f60;
          display: block;
          font-size: 1.5rem;
          line-height: 2rem;
          width: 2rem;
          height: 2rem;
          margin: 0 auto;
        }
        &.router-link-exact-active {
          color: $golden;
          .mdi {
            @include shadow(1);
            display: block;
            margin: -0.5rem auto 0.5rem auto;
            border-radius: 100%;
            background: #fff;
          }
        }
      }
    }
  }
}
</style>
