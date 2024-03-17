/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-11 21:47:46
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-21 22:39:31
 * @FilePath: \collegeApplication\src\main.js
 * @Description: 介绍文件的作用
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIconModules from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import "default-passive-events";
import "./assets/css/index.css"; // 引入全局样式文
const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .use(VueAxios, axios)
  .mount("#app");

// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName];
    app.component(iconName, item);
  }
}
