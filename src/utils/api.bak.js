// import router from "@/router";
// import {
//   resolve
// } from "url";
import store from "@/store";
const host =
  process.env.NODE_ENV == "development" ? "/vapi" : "https://m.zjgt.com/ashx/";

const api = {
  //获取首页banner图片列表
  getSlider: function () {
    let url = host + "/WebStation.ashx";
    let data = objToForm({
      cmdtype: "getbanner"
    });
    let param = {
      body: data
    };
    return xget(url, param).then(d => {
      let data = [];
      d.result.forEach((el, i) => {
        data[i] = {
          id: el.Id,
          url: el.ImgPath,
          link: el.ImgUrl,
          text: null
        };
      });
      return data;
    });
  },
  //获取首页产品列表
  getIdxPrd: function () {
    let url = host + "/UserInvest.ashx";
    let data = objToForm({
      cmdtype: "getprojectlist",
      pagesize: 10,
      curpage: 1,
      type: 1
    });
    let param = {
      body: data
    };
    return xget(url, param).then(d => {
      let data = [];
      d.result.forEach((el, i) => {
        data[i] = {
          id: el.proId,
          title: el.borrowTitle,
          incomeRate: el.rate,
          progress: el.inRate,
          term: el.term,
          termType: el.termType == "月" ? "个月" : el.termType,
          total: el.total,
          interestType: (function () {
            switch (el.xmType) {
              case "0":
                return ["定期", "满标后计息"];
              case "1":
                return ["活期", ""];
              case "3":
                return ["定期", "投资后<em>次日计息</em>"];
              default:
                return "nothing";
            }
          })()
        };
      });
      return data;
    });
  },
  // 获取站点运营信息
  getSiteInfo: function () {
    let url = host + "/User.ashx";
    let data = objToForm({
      cmdtype: "getlenddetail"
    });
    let param = {
      body: data
    };
    return xget(url, param).then(d => {
      let org = d.result[0];
      let data = {
        continuedDays: org.ContinuedDays,
        lendCount: org.LendCount,
        totalIncome: org.SumExpectMoney,
        totalTransaction: org.SumLendMoney
      };
      return data;
    });
  },
  // 登陆
  login: async function (ac, pw) {
    let url = host + "/User.ashx";
    let param = {
      body: objToForm({
        cmdtype: "login",
        account: ac,
        password: pw
      })
    };
    const d = await xget(url, param);
    store.commit("loginState/logIn", d.result.username);
    // if (rdUrl) {
    //   router.replace({
    //     path: rdUrl
    //   });
    // } else {
    //   router.replace({
    //     path: "/"
    //   });
    // }
    Promise.resolve();
  },
  // 注销
  logout: function () {
    let url = host + "/User.ashx";
    let param = {
      body: objToForm({
        cmdtype: "singout"
      })
    };
    xget(url, param).then(d => {
      console.log(d);
      store.commit("loginState/logOut");
      location.reload();
    });
  },
  // 检测登陆状态
  isLogin: function () {
    let url = host + "/User.ashx";
    let param = {
      body: objToForm({
        cmdtype: "ssouserlogin"
      })
    };
    return xget(url, param)
      .then(d => {
        return Promise.resolve(d);
      })
      .catch(d => {
        // router.replace({
        //   name: "login",
        //   params: {
        //     redirectUrl: router.currentRoute.fullPath
        //   }
        // });
        return Promise.reject(d);
      });
  },
  // 个人账户信息
  myaccount: function () {
    let url = host + "/User.ashx";
    let param = {
      body: objToForm({
        cmdtype: "myaccount"
      })
    };
    let data = () => {
      let data;
      try {
        data = xget(url, param).then(d => {
          // store.commit("userInfo/setInfo", d.result[0]);
          return d.result[0];
        });
      } catch {
        data = {};
      }
      return data;
    };
    return data();
    // return this.isLogin().then(() => {
    //   return xget(url, param).then(d => {
    //     let data;
    //     d = d.result[0]
    //     data = d
    //     return data;
    //   })
    // })
  },
  investlog: function ({
    cur = 1,
    size = 5,
    st = 0
  } = {}) {
    let url = host + "/UserInvest.ashx";
    let param = {
      body: objToForm({
        cmdtype: "getinvestlog",
        projectstatus: st,
        pagesize: size,
        curpage: cur
      })
    };
    let data = xget(url, param)
      .then(d => {
        return d.result;
      })
      .catch(() => {
        return [];
      });

    return data;
  },
  getCoinLog: function () {
    let url = host + "/User.ashx";
    let param = {
      body: objToForm({
        cmdtype: "getgoldcoinlog",
        pagesize: 20,
        curpage: 1
      })
    };
    let data = xget(url, param)
      .then(d => {
        let obj = {
          number: d.result.zjbnumber,
          list: JSON.parse(d.result.data)
        };
        return obj;
      })
      .catch(() => {
        return {};
      });
    return data;
  },
  getRedpacket: function ({
    state = 0
  } = {}) {
    let url = host + "/UserInvest.ashx";
    let param = {
      body: objToForm({
        cmdtype: "getredpacket",
        rpState: state,
        pagesize: 20,
        curpage: 1
      })
    };
    let data = xget(url, param)
      .then(d => {
        return JSON.parse(d.result[0].dataList);
      })
      .catch(() => {
        return {};
      });
    return data;
  },
  getJxq: function ({
    cur = 1,
    size = 5,
    st = 0
  } = {}) {
    let url = host + "/UserInvest.ashx";
    let param = {
      body: objToForm({
        cmdtype: "getuserjxq",
        rateStatus: st,
        rateType: "",
        pagesize: size,
        curpage: cur
      })
    };
    let data = xget(url, param).then(d => d.result);
    return data;
  },
  test: function () {
    console.log("test done");
  }
};

//fetch function 传入URL及参数获取数据
const xget = function (url, param) {
  param.method = !param.method ? "post" : param.method;
  return fetch(url, param)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(json => {
      if (json.status == "0") {
        return json;
      } else {
        let msg = json.message ? json.message : "unknown error";
        throw msg;
      }
    })
    .catch(err => {
      let ary = [];
      param.body.forEach((v, k) => {
        ary.push(`${k}:${v}`);
      });
      console.error(
        "Error:",
        `${err}
        ${url}
        ${ary}`
      );
      throw err;
    });
};

//将object转换为FormData
const objToForm = function (obj) {
  let fdata = new FormData();
  for (let key in obj) {
    fdata.append(key, obj[key]);
  }
  return fdata;
};

const objToParam = function (obj) {
  let param = "";
  for (let key in obj) {
    param = param + key + "=" + obj[key] + "&";
  }
  return param;
};

export default api;
