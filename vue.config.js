// vue.config.js
//const fs = require('fs')

module.exports = {
  //baseUrl: "/gk2018/wx",
  configureWebpack: {
    devtool: 'source-map'
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].chunksSortMode = "none";
      return args;
    });
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        // data: `@import "@/theme.scss";`
        data: `@import "@/v_mix.scss";`
      }
    }
  },
  devServer: {
    // 设置主机地址
    // host: 'localhost',
    // 设置默认端口
    // port: 8080,
    // 设置代理
    proxy: {
      "/vapi/": {
        // 目标 API 地址
        // target: "http://devm.zjgt168.com/ashx/",
        target: "https://m.zjgt.com/ashx/",
        pathRewrite: {
          "^/vapi/": ""
        }
        // 如果要代理 websockets
        //ws: true,
        // 将主机标头的原点更改为目标URL
        // changeOrigin: false
      }
    }
  }
};
