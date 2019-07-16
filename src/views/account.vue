<template>
  <div class="account container">
    <div class="userInfo">
      <div class="col-12 inner columns">
        <div class="col-2 username">
          <span v-text="`您好，`+username"></span>
        </div>
        <div class="col-4 auth">
          <i class="mdi mdi-cellphone"></i>
          <i class="mdi mdi-account-check"></i>
          <i class="mdi mdi-credit-card"></i>
        </div>
        <div class="col-4 usermoney" v-if="uInfo">
          <span v-text="`总资产：${uInfo.totalmoney} 元`"></span>
          <div class="btn-group">
            <a href class="btn btn-primary">充值</a>
            <a href class="btn">提现</a>
          </div>
        </div>
        <div class="col-2 etc">
          <a href>
            <i class="mdi mdi-bell-outline"></i>
          </a>
          <a href>
            <i class="mdi mdi-dots-vertical"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="menu column col-2">
        <router-link to="/account">
          <span>
            账户首页
            <i class="mdi mdi-home-outline"></i>
          </span>
        </router-link>
        <router-link to="/account/invests">
          <span>
            投资记录
            <i class="mdi mdi-settings-outline"></i>
          </span>
        </router-link>
        <router-link to="/account/welfare">
          <span>
            我的福利
            <i class="mdi mdi-wallet-giftcard"></i>
          </span>
        </router-link>
        <router-link to="/account/manage">
          <span>
            账户管理
            <i class="mdi mdi-settings-outline"></i>
          </span>
        </router-link>
      </div>
      <router-view class="column col-10 content" :userInfo="uInfo"></router-view>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
export default {
  name: "account",
  components: {},
  data() {
    return {
      uInfo: null,
      username: null
    };
  },
  beforeMount: function() {
    api.myaccount().then(d => {
      this.uInfo = d;
    });
    this.username = localStorage.getItem("username");
  },
  mounted: function() {}
};
</script>

<style lang="scss" scoped>
// @import "@/theme.scss";
.account {
  margin: 1em auto;
  min-height: 10rem;
  max-width: 1200px;
}
.userInfo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-left: 2em;
  z-index: 800;
  .inner {
    background: #fff;
    margin-top: 1em;
    height: 4em;
    line-height: 4em;
    @include shadow(1);
    border-radius: 2em 0.2em 0.2em 2em;
    .username {
      text-indent: 1em;
    }
    .auth {
      font-size: 1.5em;
      .mdi {
        color: $golden;
        margin: 0 0.3em;
      }
    }
    .usermoney {
      .btn-group {
        margin-left: 1em;
        .btn {
          padding-left: 1em;
          padding-right: 1em;
        }
      }
    }
    .etc {
      text-align: right;
      color: $golden;
      font-size: 2em;
      .mdi {
        margin: 0 0.5em;
      }
    }
  }
}
.menu {
  padding-top: 6em;
  background: $golden;
  min-height: 500px;
  z-index: 700;
  a {
    display: block;
    height: 3em;
    line-height: 3em;
    margin: 0.5em -0.5em;
    text-indent: 1em;
    color: rgba(#fff, 0.87);
    .mdi {
      font-size: 1.2em;
      vertical-align: middle;
    }
    &.router-link-exact-active,
    &:hover {
      margin-right: -3.5em;
      padding-right: 1em;
      border-radius: 0 1.5em 1.5em 0;
      background: #fff;
      color: $golden;
      @include shadow(1);
      .mdi {
        font-size: 1.6em;
      }
    }
    span {
      right: 1em;
      display: block;
      position: absolute;
    }
  }
}
.content {
  margin-top: 6em;
  padding-left: 4em;
}
</style>
