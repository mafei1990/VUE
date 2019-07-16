<template>
  <div class="login">
    <div class="panel form-group">
      <label class="form-label" for="username">
        <span class="mdi mdi-account"></span>
        <input
          class="form-input"
          type="text"
          placeholder="请输入用户名"
          v-model="username.val"
          @blur="check('mobile')"
        >
        <span class="tip" v-text="username.tip" v-if="!username.ok"></span>
      </label>
      <label class="form-label" for="password">
        <span class="mdi mdi-key"></span>
        <input
          class="form-input"
          type="password"
          placeholder="请输入密码"
          v-model="password.val"
          @keyup.enter="login()"
        >
      </label>
      <button id="lgBtn" @click="login()" class="btn btn-primary">登录</button>
      <button class="btn btn-primary" @click="logout()">LOGOUT</button>
      <button class="btn" @click="testx()">testx</button>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
import vrf from "@/utils/vrf.js";
export default {
  name: "login",
  components: {},
  data: function() {
    return {
      username: {
        val: "",
        tip: "",
        ok: true
      },
      password: {
        val: "",
        tip: "",
        ok: true
      },
      rdUrl: null
    };
  },
  mounted() {
    this.rdUrl = this.$route.params.redirectUrl
      ? this.$route.params.redirectUrl
      : null;
    console.log(this.rdUrl);
  },
  methods: {
    login: function() {
      console.log(`${this.username.val}\n${this.password.val}`);
      api
        .login(this.username.val, this.password.val)
        .then(() => {
          console.log("logined");
          this.$router.replace({
            path: this.rdUrl ? this.rdUrl : "/"
          });
        })
        .catch(err => {
          this.$popup.show({
            cont: err,
            title: "登录失败",
            func: this.clearPw
          });
        });
    },
    testx: function() {
      alert("testx");
    },
    logout: function() {
      api.logout();
    },
    clearPw: function() {
      this.password.val = "";
    },
    test: function() {
      this.$popup.show({
        cont: "自定义事件测试用",
        cancelBtn: false,
        func: this.testEvent
      });
    },
    testEvent: function() {
      alert("自定义事件");
    },
    check: function(type) {
      let t;
      switch (type) {
        case "mobile":
          t = "username";
      }
      let d = vrf(this[t].val, type);
      this[t].ok = d.result;
      this[t].tip = d.hint;
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  .panel {
    position: relative;
    width: 300px;
    height: auto;
    padding: 0.5em;
    @include shadow(3);
    background: #fff;
    label {
      display: flex;
      align-items: center;
      .mdi {
        width: 1.5em;
      }
      input {
        border: none;
        box-shadow: none;
        border-bottom: 2px solid $golden;
      }
    }
    #lgBtn {
      // display: bolck;
      width: 100%;
    }
  }
}
label {
  position: relative;
  .tip {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1rem;
    line-height: 1.4em;
    height: 1.4em;
    padding: 0 0.2em;
    transform-origin: 100% 0;
    transform: scale(0.5, 0.5);
    background: #f33;
    color: #fff;
    border-radius: 0.2em;
  }
}
</style>
