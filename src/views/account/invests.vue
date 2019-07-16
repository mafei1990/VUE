<template>
  <div class="invests">
    <div class="list container">
      <div class="btn-group">
        <button
          class="btn"
          :class="{'btn-primary':pg.st==0}"
          :disabled="pg.st==0"
          @click="tab()"
        >投资中</button>
        <button
          class="btn"
          :class="{'btn-primary':pg.st==1}"
          :disabled="pg.st==1"
          @click="tab()"
        >已结束</button>
      </div>
      <ul class="header columns">
        <li class="column col-3">投资标的</li>
        <li class="column col-3">投资金额(元)</li>
        <li class="column col-3">参考年化收益</li>
        <li class="column col-3">剩余天数</li>
      </ul>
      <div class="cont">
        <ul class="columns" v-for="(iv,idx) in invests" :key="idx">
          <li class="column col-3" v-text="iv.title" :title="iv.title"></li>
          <li class="column col-3" v-text="iv.amount"></li>
          <li class="column col-3">
            <span class="orange" v-text="`${iv.maxRate}%`"></span>
          </li>
          <li class="column col-3" v-text="`${iv.endDay}天`"></li>
        </ul>
        <button
          class="btn btn-link more"
          @click="getLst()"
          v-if="!end"
          :disabled="!more"
          :class="{loading:!more}"
        >更多...</button>
        <span class="end" v-else>没有更多了</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api.js";
export default {
  name: "acntInvests",
  components: {},
  data() {
    return {
      invests: null,
      pg: {
        cur: 0,
        st: 0,
        size: 10
      },
      more: false,
      end: false
    };
  },
  beforeMount() {
    this.getLst();
  },
  mounted: function() {},
  methods: {
    getLst: function({
      cur = this.pg.cur,
      size = this.pg.size,
      st = this.pg.st
    } = {}) {
      cur++;
      this.more = false;
      api.investlog({ size: size, cur: cur, st: st }).then(d => {
        if (d.length == 0) {
          this.end = true;
        } else {
          this.invests = this.invests ? this.invests.concat(d) : d;
          this.more = true;
          this.pg.cur++;
        }
      });
    },
    tab: function() {
      this.invests = null;
      this.end = false;
      this.pg.cur = 0;
      this.pg.st = this.pg.st == 0 ? 1 : 0;
      this.getLst({ st: this.st, cur: this.pg.cur });
    }
  }
};
</script>

<style lang="scss" scoped>
.invests {
  min-height: 10rem;
  .list {
    background: #fff;
    padding: 0.4rem;
    @include shadow(1);
    font-size: 0.7rem;
    line-height: 3em;
    .btn-group {
      .btn {
        padding-left: 3em;
        padding-right: 3em;
        // padding: 0 3em;
      }
      .btn-primary[disabled] {
        opacity: 1;
      }
    }
    .header {
      text-indent: 2em;
      color: $golden;
      font-weight: bold;
      border-bottom: 0.1rem solid lighten($golden, 20%);
    }
    .cont {
      ul {
        text-indent: 2em;
        border-bottom: 1px solid #eee;
        li:first-child {
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      ul:nth-child(even) {
        background: darken(white, 1);
      }
      ul:last-child {
        border: 0px none transparent;
      }
    }
    .btn.more {
      width: 100%;
    }
    .end {
      display: block;
      text-align: center;
      color: $golden;
    }
  }
}
</style>
