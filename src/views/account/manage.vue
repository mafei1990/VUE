<template>
  <div class="manage" :class="{loading:!uInfo}">
    <div class="details">
      <p>
        <ul>
          <li class="column col-4"><i class="mdi mdi-cellphone-erase"></i> 手机验证</li>
          <li class="column col-4">登录网站、找回密码等</li>
          <li class="column col-4">已绑定</li>
        </ul>
      </p>
      <p>
        <ul v-if="isolduser != 0">
          <li class="column col-4" v-if="isolduser== -1"><i class="mdi mdi-account-remove"></i> 实名认证</li>
          <li class="column col-4" v-if="isolduser== 1"><i class="mdi mdi-account-check yellow"></i> 实名认证</li>
          <li class="column col-4">资金交易前，请完成实名认证。认证后不能修改</li>
          <li class="column col-4" v-if="isolduser== -1">未认证</li>
          <li class="column col-4" v-if="isolduser== 1">已认证</li>
        </ul>
      </p>
      <p>
        <ul>
          <li class="column col-4"><i class="mdi mdi-lock-reset"></i> 密码管理</li>
          <li class="column col-4">为确保账户资金安全，请定时修改相关密码</li>
          <li class="column col-4">修改</li>
        </ul>
      </p>
      
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
export default {
  name: "acntManage",
  components: {},
  data() {
    return {
      uInfo: "xxx",
      isolduser: '',
    };
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      api.myaccount().then(data=>{
        vm.isolduser = data.isolduser
      },err=>{})
    })
  },
  mounted() {
    
  }
};
</script>

<style lang="scss" scoped>
.manage {
  min-height: 10rem;
  .details{
    padding: 0.4rem;
    background: #fff;
    p{
      height: 4rem;
      line-height: 4rem;
      border-top: 1px solid #eee;
      margin: 0;
      overflow: hidden;
      li{ 
        float: left;
        text-align: center;
        i{         
          font-size: 1.4em;
          vertical-align: middle;
        }
      }
      .yellow {
        color:$golden;
      }
    }    
  }
  
}
</style>
