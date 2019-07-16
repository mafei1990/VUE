import popupComp from "@/components/popup.vue";

let $vm;

export default {
  install(Vue, options) {
    if (!$vm) {
      const popupPlugin = Vue.extend(popupComp);

      $vm = new popupPlugin({
        el: document.createElement("div")
      });

      document.body.appendChild($vm.$el);
    }

    //设置选项默认值
    const defaultProps = {
      show: false,
      title: "提示：",
      cont: "这里输入内容",
      full: true,
      showInput: false,
      inputVal: "",
      confirmBtn: true,
      confirmBtnText: "确定",
      cancelBtn: true,
      cancelBtnText: "取消",
      closeIcon: true,
      func: null,
      funcPrmt: null
    };

    //构建插件方法
    let pop = {
      show: opt => {
        //弹框
        Object.keys(opt).forEach(key => {
          $vm[key] = opt[key];
        }); //遍历传入参数，替换插件参数

        $vm.show = true;

        $vm.$once("oncall", () => {
          let callback = $vm.func;
          let prmt = $vm.funcPrmt;
          typeof callback === "function" && callback(prmt);
        }); //接收回调事件
      },
      hide: () => {
        //隐藏弹框
        $vm.show = false;
        Object.keys(defaultProps).forEach(key => {
          $vm[key] = defaultProps[key];
        }); //恢复默认值
      }
    };

    Vue.prototype.$popup = pop;
  }
};
