<template>
  <div id="popup" :class="{'full':full==true}" v-show="show">
    <div class="inner">
      <div class="head" v-text="title"></div>
      <div class="cont" v-text="cont">test</div>
      <div class="foot">
        <button class="cancel btn btn-link" v-text="cancelBtnText" v-show="cancelBtn" @click="off()"></button>
        <button class="confirm btn btn-primary" v-text="confirmBtnText" v-show="confirmBtn" @click="confirm"></button>
      </div>
      <i class="closeBtn mdi mdi-close-circle-outline" @click="off()"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "popup",
  props: {
    show: {
      type: Boolean,
      default: false //显示控制
    },
    title: {
      type: String,
      default: "提示：" //标题
    },
    cont: {
      type: String,
      default: "这里输入内容" //内容
    },
    full: {
      type: Boolean,
      default: true //全屏
    },
    showInput: {
      type: Boolean,
      default: false //显示输入框 还没做。。。
    },
    inputVal: {
      type: String,
      default: "" //输入框默认值
    },
    confirmBtn: {
      type: Boolean,
      default: true //确认按钮
    },
    confirmBtnText: {
      type: String,
      default: "确定" //确认按钮文字
    },
    cancelBtn: {
      type: Boolean,
      default: true //取消按钮
    },
    cancelBtnText: {
      type: String,
      default: "取消" //取消按钮文字
    },
    closeIcon: {
      type: Boolean,
      default: true //关闭图标
    },
    func: {
      type: Function,
      default: null //回调
    },
    funcPrmt: null //回调参数
  },
  data: function() {
    return {
      defalut: null
    };
  },
  methods: {
    on: function() {
      this.show = true;
    },
    off: function() {
      this.$popup.hide();
    },
    confirm: function() {
      this.$emit("oncall"); //触发回调
      this.off();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
#popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &.full {
    background: rgba(0, 0, 0, 0.6);
  }
  .inner {
    @include shadow(3);
    position: relative;
    background: #fff;
    width: 500px;
    max-width: 88%;
    border-radius: 3px;
    padding: 0.5em 1em 0 1em;
    .head {
      font-size: 1.2em;
      line-height: 2em;
      color: $golden;
    }
    .cont {
      padding: 0 0 1em 0;
      line-height: 2em;
    }
    .closeBtn {
      display: block;
      width: 1em;
      height: 1em;
      position: absolute;
      top: -0.5em;
      right: -0.5em;
      font-size: 2em;
      line-height: 1em;
      color: $golden;
      background: #fff;
      border-radius: 100%;
      @include shadow(1);
    }
    .foot {
      display: flex;
      margin: 0 -1em;
      button {
        display: block;
        flex: 1;
      }
    }
  }
}
</style>
