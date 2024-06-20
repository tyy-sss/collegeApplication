<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script setup>
import { onMounted } from "vue";
// 处理ResizeObserver loop limit exceeded问题
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};
onMounted(() => {
  console.log("-----------------------------------------------------------------");
  console.log(
    "吉首大学 版权所有 开发工作室：吉首大学HOPE实验室 CX|CJ|TYY|ZWY|YSB"
  );
  console.log("-----------------------------------------------------------------");
});

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
};
</script>
<style>
*,
html,
body {
  padding: 0;
  margin: 0;
  cursor: pointer;
}
body,
html,
#app {
  height: 100%;
  width: 100%;
}
* {
  /* 滑动时报错 */
  touch-action: pan-y;
}
</style>
