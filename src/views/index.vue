<template>
  <div class="index" id="index">
    <component
      :is="(sliderSetting)?'slider':'loading'"
      :setting="sliderSetting"
      style="height:300px;"
    ></component>
    <div class="container">
      <div id="sitInfo" class="columns" v-if="siteInfo">
        <div class="col-3 col-lg-6 column">
          <div>累计成交</div>
          <span v-text="siteInfo.totalTransaction"></span>
        </div>
        <div class="col-3 col-lg-6 column">
          <div>累计投资者</div>
          <span v-text="siteInfo.lendCount"></span>
        </div>
        <div class="col-3 col-lg-6 column">
          <div>累计收益</div>
          <span v-text="siteInfo.totalIncome"></span>
        </div>
        <div class="col-3 col-lg-6 column">
          <div>运营时间</div>
          <span v-text="siteInfo.continuedDays"></span>
        </div>
      </div>

      <ul class="columns" id="prdLst" :class="{loading: !prdLst}">
        <li v-for="prd in prdLst" :key="prd.id" class="col-3 col-lg-12 column">
          <div>
            <span class="tit" v-text="prd.title"></span>
            <div class="incomeRateOutter outter">
              <span class="left">历史平均年化率</span>
              <span class="incomeRate right" v-text="prd.incomeRate+'%'"></span>
            </div>
            <div class="interestTypeOutter outter" v-if="prd.interestType[0]=='定期'">
              <span class="xmtype left" v-text="prd.interestType[0]"></span>
              <span class="interestCount right" v-text="prd.interestType[1]"></span>
            </div>
            <div class="termOutter outter">
              <span class="left">项目期限</span>
              <span class="termType right" v-text="prd.term+prd.termType"></span>
            </div>
            <div class="totalOutter outter">
              <span class="total" v-text="prd.total"></span>
            </div>
            <a class="btn" :href="`/lend/`+prd.id">
              <span class="pst" :style="{width:prd.progress+'%'}"></span>
              <span>{{prd.progress}}%</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
import loading from "@/components/loading.vue";
import slider from "@/components/slider.vue";

export default {
  name: "index",
  components: {
    loading,
    slider
  },
  data() {
    return {
      msg: "this is index",
      prdLst: null,
      sliderSetting: null,
      siteInfo: null
    };
  },
  mounted() {
    api.getSlider().then(data => {
      this.sliderSetting = data;
    });
    api.getIdxPrd().then(data => {
      this.prdLst = data;
    });
    api.getSiteInfo().then(data => {
      this.siteInfo = data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#index {
  .container {
    max-width: 1200px;
  }
}
#sitInfo {
  @include shadow(1);
  border-radius: 0.2em;
  margin-bottom: 1em;
  background: #fff;
  & > div {
    line-height: 2em;
    text-align: center;
    font-size: 0.875em;
    padding: 1em 0;
    span {
      color: rgba(darken(red, 3%), 0.87);
      font-size: 1.5em;
    }
  }
}
#prdLst {
  li {
    display: block;
    margin-bottom: 1.5em;
    min-height: 300px;
    & > div {
      margin: 0.5em;
      padding: 0.5em;
      padding-bottom: 2em;
      @include shadow(1);
      border-radius: 0.2em;
      background: #fff;
      transition: 0.15s all ease-in-out;
      &:hover {
        cursor: pointer;
        @include shadow(3);
        a.btn {
          @include shadow(3);
        }
      }
    }
    .tit {
      display: block;
      height: 2em;
      margin: -0.5em;
      font-size: 1.2em;
      margin-bottom: 0.5em;
      line-height: 2em;
      text-indent: 0.5em;
      @extend .tmp;
      border-radius: 0.2em 0.2em 0 0;
    }
    .outter {
      margin: 1em 0;
      font-size: 0.875em;
      display: flex;
      justify-content: space-between;
      span {
        display: block;
      }
    }
    a.btn {
      display: block;
      position: absolute;
      width: 80%;
      height: 3em;
      line-height: 3em;
      left: 10%;
      bottom: -1.5em;
      padding: 0;
      border-radius: 1.5em;
      color: $golden;
      font-size: 1em;
      text-align: center;
      @include shadow(1);
      transition: 0.3s all ease-in-out;
      .pst {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 1.5em;
        top: 0;
        left: 0;
        background: lighten($golden, 36%);
        @include shadow(0.2);
      }
    }
  }
}
.tmp {
  background: linear-gradient(135deg, $golden 0%, lighten($golden, 18%) 100%);
  color: rgba(#fff, 0.87);
}
</style>
