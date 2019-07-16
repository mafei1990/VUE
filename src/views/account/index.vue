<template>
  <div class="index" :class="{loading:!uInfo}">
    <ul v-if="uInfo" class="account columns block">
      <li class="column col-3">
        <div>
          <span class="tit">累计收益</span>
          <span class="cont" v-text="uInfo.accountcumulativeprofit+` 元`"></span>
          <span class="tit">昨日收益</span>
          <span class="cont" v-text="uInfo.accountyesterdayprofit+` 元`"></span>
        </div>
      </li>
      <li class="column col-3">
        <div>
          <span class="tit">冻结资金</span>
          <span class="cont" v-text="uInfo.forzenmoney+` 元`"></span>
        </div>
      </li>
      <li class="column col-3">
        <div>
          <span class="tit">可用资产</span>
          <span class="cont" v-text="uInfo.usemoney+` 元`"></span>
        </div>
      </li>
      <li class="column col-3">
        <div>
          <span class="tit">富友余额</span>
          <span class="cont" v-text="uInfo.fuyoumoney+` 元`"></span>
        </div>
      </li>
    </ul>
    <div class="dealList block container">
      <div class="filter">
        <div class="byDate form-group">
          <span class="tit">起始日期：</span>
          <label class="form-label form-inline has-icon-right" for="dateFromSel">
            <input id="dateFromSel" class="form-input input-sm" type="date">
            <i class="form-icon mdi mdi-calendar"></i>
          </label>
          <label class="form-label form-inline has-icon-right" for="dateToSel">
            ---
            <input id="dateToSel" class="form-input input-sm" type="date">
            <i class="form-icon mdi mdi-calendar"></i>
          </label>
          <button class="btn btn-primary btn-sm">全部</button>
          <button class="btn btn-link btn-sm">今天</button>
          <button class="btn btn-link btn-sm">近一个月</button>
          <button class="btn btn-link btn-sm">3个月</button>
          <button class="btn btn-link btn-sm">半年</button>
          <button class="btn btn-link btn-sm">一年</button>
        </div>
        <div class="byType form-group">
          <span class="tit">交易类型：</span>
          <button class="btn btn-primary btn-sm">全部</button>
          <button class="btn btn-link btn-sm">投资</button>
          <button class="btn btn-link btn-sm">投资收入</button>
          <button class="btn btn-link btn-sm">投资收益</button>
          <button class="btn btn-link btn-sm">充值</button>
          <button class="btn btn-link btn-sm">提现</button>
          <button class="btn btn-link btn-sm">活动奖励</button>
        </div>
      </div>
      <div class="list">
        <ul class="header columns">
          <li class="column col-3">投资标的</li>
          <li class="column col-3">投资金额(元)</li>
          <li class="column col-3">参考年化收益</li>
          <li class="column col-3">剩余天数</li>
        </ul>
        <div class="cont">
          <ul class="columns" :class="{loading:!invests}" v-for="(iv,idx) in invests" :key="idx">
            <li class="column col-3" v-text="iv.title"></li>
            <li class="column col-3" v-text="iv.amount"></li>
            <li class="column col-3">
              <span class="orange" v-text="`${iv.maxRate}%`"></span>
            </li>
            <li class="column col-3" v-text="`${iv.endDay}天`"></li>
          </ul>
          <router-link to="account/invests" class="float-right">更多</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
export default {
  name: "acntIndex",
  components: {},
  props: {
    userInfo: Object
  },
  data() {
    return {
      // uInfo: null
      invests: null
    };
  },
  mounted: function() {
    api.investlog().then(d => {
      this.invests = d;
    });
  },
  computed: {
    uInfo: function() {
      return this.userInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
.block {
  margin-bottom: 1rem;
}
.account {
  li {
    div {
      height: 120px;
      background: #fff;
      padding: 0.5em;
      @include shadow(1);
      border-radius: 0.2em;
      .tit,
      .cont {
        display: block;
      }
      .tit {
        color: $golden;
      }
    }
  }
}
.dealList {
  background: #fff;
  padding: 0.4rem;
  @include shadow(1);
  font-size: 0.7rem;
  .filter {
    margin-bottom: 1em;
    .tit {
      display: inline-block;
      width: 6em;
      vertical-align: middle;
    }
    .form-group {
      label,
      .btn {
        margin: auto 0.5em;
      }
      .mdi {
        color: $golden;
        font-size: 0.8rem;
      }
    }
  }
  .list {
    margin: 0.4rem;
    line-height: 3em;
    text-indent: 2em;
    .header {
      color: $golden;
      font-weight: bold;
      border-bottom: 0.1rem solid lighten($golden, 20%);
    }
    .cont {
      ul {
        border-bottom: 1px solid #eee;
        li:first-child {
          font-weight: bold;
        }
      }
      ul:nth-child(even) {
        background: darken(white, 1);
      }
      ul:last-child {
        border: 0px none transparent;
      }
    }
  }
}
</style>
