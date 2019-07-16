<template>
  <div class="home">
    <div class="container">
      <div class="columns">
          <div class="column col-12 hide-lg"><img src="http://www.zjgt.com/public/images/invest/product-title.jpg" class="img-responsive img-fit-contain"></div>
        
          <div class="column col-8 col-lg-12 pr_list">
            <ul class="prdLst">
              <li v-for="prd in prdLst" :key="prd.id">
                <div class="pl-2 biao">{{prd.title}}</div>
                <div style="">
                  <ul class="pt-3 pb-3">
                    <li class="column col-3 text-center nei">{{prd.incomeRate}}%</li>                   
                    <li class="column col-3 text-center nei">{{prd.term}}个月</li>
                    <li class="column col-3 text-center nei">满标后计息</li>
                    <li class="column col-3 text-center nei" v-text="prd.total + '元'"></li>
                    <li class="column col-3 text-center nei">项目期限</li>
                    <li class="column col-3 text-center nei">参考收益率</li>                   
                    <li class="column col-3 text-center nei">计息方式</li>                   
                    <li class="column col-3 text-center nei">立即投资</li>
                  </ul>
                </div>
                <div class="gr">
                  <div class="grLeft">
                    <div class="bar bar-sm">
                        <div class="bar-item" role="progressbar" :style="'width:' + prd.progress + '%'" :aria-valuenow='prd.progress' aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div class="text-center grRight">{{prd.progress}}%</div>
                </div>
              </li>
            </ul>
          </div>
          
          <div class="column hide-lg col-ml-auto bg">           
            <div class="con">
              <div class="text-center con_t">投资排行榜</div>
              <div class="d-flex tzph br_75 c-hand">
                <div class="column col-6 text-center br_75" :class="[tab_a == 0 ? 'bg_b' : '']" @click="tabA(0)">当月投资</div>
                <div class="column col-6 text-center br_75" :class="[tab_a == 1 ? 'bg_b' : '']" @click="tabA(1)">累计投资</div>
              </div>
              <div class="pb-2 ph_li">
                <ul class="d-flex">
                  <li>等级</li>
                  <li>用户</li>
                  <li>投资金额（元）</li>
                </ul>
                <ul class="d-flex" v-show="tab_a == 0">
                  <li>111</li>
                  <li>111</li>
                  <li>111</li>
                </ul>
                <ul class="d-flex" v-show="tab_a == 1">
                  <li>222</li>
                  <li>222</li>
                  <li>222</li>
                </ul>
              </div>
            </div>

            <div class="con mt-2">
              <div class="text-center con_t">理财数据</div>
              <div>
                <ul>
                  <li>累计成交金额：</li>
                  <li>累计投资者：</li>
                  <li>累计收益：</li>
                  <li>运营时间：</li>
                </ul>
              </div>
            </div>
          </div>

        </div>      
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "home",
  data(){
    return{
      prdLst: [],
      tab_a: 0
    }
  },
  mounted(){
    api.getIdxPrd().then(data=>{
      console.log(data);
      this.prdLst = data
    })
  },
  methods:{
    tabA:function(i){
      this.tab_a = i
    }
  }
};
</script>
<style scoped lang="scss">
.br_75 {
  border-radius: 0.75rem;
}
.bg_b{
  color: #fff;
  background: blue;
}
.container {
  max-width: 1200px;
}
.pr_list{
  li{
    background: #fff;
    margin-bottom: 10px;
    padding: 0.5rem 0;
    .grLeft{
      margin-top: 8px;
    }
    .grRight{
      width: 10%;
    }
    ul{
      padding: 0.5rem 0;
      overflow: hidden;
    }
    .nei{
      float: left;
    }
    .gr{
      display: flex;
      height: 1.25rem;
      margin: 0 0.5rem 0.5rem 0.5rem;
      .grLeft{
        width: 90%;
        margin-top: 0.5rem;
      }
      .grRight{
        width: 10%;
      }
    }
  }
}
.bg{
  padding: 0;
  .con{
    background: #fff;
    padding: 0 0.5rem;
    .con_t {
      height: 2.5rem;
      line-height: 2.5rem;
    }
    .tzph {
      border: 1px solid #999;
      height: 1.5rem;
      line-height: 1.4rem;
    }
    .ph_li {
      li {
        width: 33.33333%;
        text-align: center;
        height: 1.25rem;
        line-height: 1.25rem;
        margin-top: 1rem;
      }
    }    
  }
  
}

@media (max-width: 480px){
 .prdLst{
   font-size:0.7rem;
   li{
     .gr{
        .grRight{
          width: 5rem;
        }
      }
    }
  }
}
</style>
