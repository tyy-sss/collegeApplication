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

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .use(VueAxios, axios)
  .mount("#app");

app.directive("drag", {
  // 指令绑定到元素上回立刻执行bind函数，只执行一次
  bind: function (el) {},
  //inserted表示一个元素，插入到DOM中会执行inserted函数，只触发一次
  inserted: function (el) {
    let wMax = document.documentElement.clientWidth - el.offsetWidth;
    let hMax = document.documentElement.clientHeight - el.offsetHeight;

    if ("ontouchstart" in window) {
      // 移动端
      el.ontouchstart = function (e) {
        let time1 = new Date().getTime();
        let x = e.touches[0].pageX - el.offsetLeft;
        let y = e.touches[0].pageY - el.offsetTop;
        // 抑制浏览器端默认拖拽行为，移动端是拖拽屏幕，pc端无
        // e.preventDefault(); 开启后点击 子集点击事件事件会无效
        document.ontouchmove = function (e) {
          let time2 = new Date().getTime();
          if (time2 - time1 > 300) {
            el.classList.remove("v-drag-inactive");
            el.classList.add("v-drag-active");
          }
          let left = e.touches[0].pageX - x;
          let top = e.touches[0].pageY - y;

          if (left < 0) left = 0;
          else if (left > wMax) left = wMax;

          if (top < 0) top = 0;
          else if (top > hMax) top = hMax;

          el.style.left = left + "px";
          el.style.top = top + "px";
        };
        document.ontouchend = function () {
          let time2 = new Date().getTime();
          if (time2 - time1 > 300) {
            el.classList.remove("v-drag-active");
            el.classList.add("v-drag-inactive");
          }

          document.ontouchmove = document.ontouchend = null;
        };
      };
    } else {
      // pc端
      el.onmousedown = function (e) {
        let time1 = new Date().getTime();
        let x = e.pageX - el.offsetLeft;
        let y = e.pageY - el.offsetTop;
        document.onmousemove = function (e) {
          let time2 = new Date().getTime();
          if (time2 - time1 > 300) {
            el.classList.remove("v-drag-inactive");
            el.classList.add("v-drag-active");
          }
          el.style.left = e.pageX - x + "px";
          el.style.top = e.pageY - y + "px";
        };
        document.onmouseup = function () {
          let time2 = new Date().getTime();
          if (time2 - time1 > 300) {
            el.classList.remove("v-drag-active");
            el.classList.add("v-drag-inactive");
          }
          document.onmousemove = document.onmouseup = null;
        };
      };
    }
  },
  updated: function (el) {},
});
// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName];
    app.component(iconName, item);
  }
}
