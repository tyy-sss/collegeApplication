import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIconModules from "@element-plus/icons-vue";
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 动态菜单
const addMenu = () =>{
  store.commit("addMenu");
}
addMenu();

const app = createApp(App);
app.use(store).use(router).use(ElementPlus,{ locale: zhCn }).use(VueAxios, axios).mount("#app");

// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName];
    app.component(iconName, item);
  }
}
