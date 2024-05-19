/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2024-04-04 20:52:05
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-04-08 16:06:23
 * @FilePath: \collegeApplication\vue.config.js
 * @Description: 介绍文件的作用
 */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  //关闭eslint【
  lintOnSave: false,
  //代理跨域
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080", //'服务器真实地址',
        changeOrigin: true, // 是否跨域
      },
    },
    client: {
      overlay: false//关闭客户端显式错误
    }
  },
  publicPath: "/",
});
