<template>
  <div class="welfare" :class="{loading:!coins}">
    <div class="container">
      <ul class="tab">
        <li class="tab-item" :class="{active:type=='coins'}">
          <a href @click.prevent="tab('coins')">
            <i class="mdi mdi-currency-cny"></i>中金币
          </a>
        </li>
        <li class="tab-item" :class="{active:type=='redpackets'}">
          <a href @click.prevent="tab('redpackets')">
            <i class="mdi mdi-email-outline"></i>红包
          </a>
        </li>
        <li class="tab-item" :class="{active:type=='jxq'}">
          <a href @click.prevent="tab('jxq')">
            <i class="mdi mdi-ticket"></i>加息券
          </a>
        </li>
        <li class="tab-item" :class="{active:type=='prize'}">
          <a href @click.prevent="tab('prize')">
            <i class="mdi mdi-gift"></i>我的奖品
          </a>
        </li>
      </ul>
      <div class="list">
        <div class="coin" v-if="type=='coins' && coins">
          <div class="temp" v-if="coins.list.length == 0">没有加息券</div>
          <ul>
            <li v-for="(coin,idx) in coins.list" :key="idx" class="columns">
              <div class="column type">
                <span v-text="coin.type"></span>
              </div>
              <div class="column amount">
                <span
                  :class="{in:coin.direction=='收入',out:coin.direction=='支出'}"
                >{{coin.direction|inOut}}{{coin.amount}}</span>
              </div>
              <div class="column time" v-text="coin.createTime"></div>
            </li>
          </ul>
        </div>
        <div
          class="redpackets"
          v-if="type=='redpackets'&&redpackets"
          :class="{avlb:redpackets.state==0,used:redpackets.state==1,exped:redpackets.state==2}"
        >
          <div class="btn-group">
            <button
              class="btn"
              :class="{active:redpackets.state==0,loading:loading=='rp0'}"
              :disabled="redpackets.state==0"
              @click="getRedpacket(0)"
            >可用红包</button>
            <button
              class="btn"
              :class="{active:redpackets.state==1,loading:loading=='rp1'}"
              :disabled="redpackets.state==1"
              @click="getRedpacket(1)"
            >已用红包</button>
            <button
              class="btn"
              :class="{active:redpackets.state==2,loading:loading=='rp2'}"
              :disabled="redpackets.state==2"
              @click="getRedpacket(2)"
            >过期红包</button>
          </div>
          <div class="temp" v-if="redpackets.list.length == 0">没有红包</div>
          <ul class="columns">
            <li v-for="(item,idx) in redpackets.list" :key="idx" class="column col-4">
              <div class="packet">
                <span class="desc" v-text="item.description"></span>
                <span class="money">
                  <span class="rmb">￥</span>
                  <span v-text="item.money"></span>
                </span>
                <div class="detail flex">
                  <div class="column col-8">
                    <div class="source">
                      <span>来源：</span>
                      <span v-text="item.dataSource"></span>
                    </div>
                    <div class="deadline">
                      <span>期限：</span>
                      <span v-text="item.deadLine"></span>
                    </div>
                  </div>
                  <div class="column col-4">
                    <button class="btn btn-primary">立即激活</button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="jxqs" v-if="type=='jxq'&&jxq">
          <div class="btn-group">
            <button
              class="btn"
              :class="{active:jxq.state==0,loading:loading=='jxq0'}"
              :disabled="jxq.state==0"
              @click="getJxq(0)"
            >未使用</button>
            <button
              class="btn"
              :class="{active:jxq.state==1,loading:loading=='jxq1'}"
              :disabled="jxq.state==1"
              @click="getJxq(1)"
            >已使用</button>
            <button
              class="btn"
              :class="{active:jxq.state==2,loading:loading=='jxq2'}"
              :disabled="jxq.state==2"
              @click="getJxq(2)"
            >已过期</button>
          </div>
          <div class="temp" v-if="jxq.list.length == 0">没有加息券</div>
          <ul class="columns">
            <li v-for="(item,idx) in jxq.list" :key="idx" class="column col-6">
              <div class="jxq flex" :title="item.desc">
                <div class="col-9 left">
                  <div class="rate">
                    <span v-text="item.rate"></span>
                    <span class="percent">%加息券</span>
                  </div>
                  <div class="type">
                    <span>使用范围：</span>
                    <span v-text="item.rateTypeName"></span>
                  </div>
                  <div class="date">
                    <span>有效期：</span>
                    <span v-text="item.getdate"></span>-
                    <span v-text="item.deadLine"></span>
                  </div>
                </div>
                <div class="state col-3">
                  <span v-if="item.rateStatus==1">已使用</span>
                  <span v-else-if="item.rateStatus==2">已过期</span>
                  <span v-else>
                    <a href>去使用</a>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="prize" v-if="type=='prize'">prize</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
export default {
  name: "acntWelfare",
  components: {},
  data() {
    return {
      type: "coins",
      loading: false,
      coins: null,
      redpackets: null,
      jxq: null,
      prize: null
    };
  },
  beforeMount() {
    api.getCoinLog().then(d => {
      this.coins = d;
      api.getRedpacket().then(d => {
        this.redpackets = {
          list: d,
          state: 0
        };
      });
      api.getJxq().then(d => {
        this.jxq = {
          list: d,
          state: 0
        };
      });
    });
  },
  mounted: function() {},
  methods: {
    tab: function(val) {
      this.type = val;
    },
    getRedpacket: function(state) {
      this.loading = "rp" + state;
      api.getRedpacket({ state: state }).then(d => {
        this.redpackets = {
          list: d,
          state: state
        };
        this.loading = false;
      });
    },
    getJxq: function(state) {
      this.loading = "jxq" + state;
      api.getJxq({ st: state }).then(d => {
        this.jxq = {
          list: d,
          state: state
        };
        this.loading = false;
      });
    }
  },
  filters: {
    inOut: function(val) {
      switch (val) {
        case "支出":
          val = "-";
          break;
        case "收入":
          val = "+";
          break;
        default:
          break;
      }
      return val;
    }
  }
};
</script>

<style lang="scss" scoped>
.welfare {
  min-height: 10rem;
  .tab-item {
    a {
      padding: 1em 1em 0.9em 1em;
      .mdi {
        display: inline-block;
        font-size: 0.875em;
        width: 1.5em;
        height: 1.5em;
        line-height: 1.5em;
        margin-right: 0.5em;
        text-align: center;
        vertical-align: middle;
        border-radius: 100%;
      }
    }
    &.active .mdi,
    &:hover .mdi {
      color: #fff;
      background: $golden;
    }
  }
  .container {
    background: #fff;
    @include shadow(1);
    .list {
      font-size: 0.7rem;
      .btn-group {
        margin: 1em 0;
        .btn.active:disabled {
          opacity: 1;
        }
      }
      .coin {
        li {
          line-height: 3em;
          .amount {
            .in {
              color: $orange;
            }
            .out {
              color: rgba(black, 0.5);
            }
          }
        }
      }
      .redpackets {
        .packet {
          color: #fff;
          // background: #f33;
          background: radial-gradient(circle at 25% 25%, #f63 0%, #d33 50%);
          margin: 1em;
          height: 12em;
          border-radius: 0.5em;
          overflow: hidden;
          @include shadow(1);
          .desc {
            position: absolute;
            width: 100%;
            top: 0.5em;
            left: 50%;
            transform: translateX(-50%);
            padding: 0 0.4rem;
            text-align: center;
          }
          .detail {
            font-size: 0.6rem;
            .col-4 {
              text-align: right;
              .btn {
                font-size: 0.6rem;
              }
            }
          }
          .money {
            font-size: 1.2em;
            position: absolute;
            display: block;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -70%);
            width: 3em;
            height: 3em;
            line-height: 3em;
            text-align: center;
            color: $golden;
            background: #fff7bf;
            border-radius: 100%;
            text-indent: -0.2em;
            @include shadow(3);
            .rmb {
              font-size: 0.8em;
            }
          }
          .detail {
            position: absolute;
            width: 100%;
            bottom: 0.5em;
          }
          &::before {
            content: "";
            display: block;
            position: absolute;
            top: -10em;
            left: 50%;
            margin-left: -8em;
            width: 16em;
            height: 16em;
            border-radius: 0.5em;
            transform: rotate(45deg) skew(-20deg, -20deg);
            transform-origin: center center;
            @include shadow(3);
          }
        }
        &.used li::after {
          content: "已使用";
        }
        &.exped li::after {
          content: "已过期";
        }
        &.used,
        &.exped {
          .packet {
            filter: grayscale(1);
            opacity: 0.5;
            .btn {
              display: none;
            }
          }
          li {
            &::after {
              display: block;
              position: absolute;
              font-size: 1.2em;
              bottom: 1.8em;
              right: 1.8em;
              width: 4em;
              height: 2em;
              line-height: 1.8em;
              text-align: center;
              color: #d33;
              border: 0.1em solid #d33;
              transform: rotate(-15deg);
              border-radius: 0.5em;
            }
          }
        }
      }
      .jxq {
        color: #fff;
        margin: 1em;
        padding: 1em 3em;
        background: linear-gradient(to right, #bbb 0%, #ddd 100%);
        border-radius: 0.5em;
        // overflow: hidden;
        @include shadow(1);
        .left {
          .rate {
            font-size: 1.6em;
            margin: 0.3em 0;
          }
        }
        .state {
          text-align: center;
          font-size: 1.2em;
          border-left: 0.2em #fff dotted;
          span {
            display: block;
            line-height: 1.8em;
            width: 1em;
            height: 100%;
            margin-left: 2.5em;
          }
        }
        &::before,
        &::after {
          content: "";
          display: block;
          position: absolute;
          width: 3em;
          height: 3em;
          top: 50%;
          border-radius: 100%;
          background: #fff;
        }
        &::before {
          left: 0;
          transform: translate(-50%, -50%);
          box-shadow: -3px 0px 3px -1.5px rgba(0, 0, 0, 0.1) inset,
            -6px 0px 6px -3px rgba(0, 0, 0, 0.12) inset;
        }
        &::after {
          right: 0;
          transform: translate(50%, -50%);
          box-shadow: 3px 0px 3px -1.5px rgba(0, 0, 0, 0.1) inset,
            6px 0px 6px -3px rgba(0, 0, 0, 0.12) inset;
        }
      }
    }
  }
}
</style>
