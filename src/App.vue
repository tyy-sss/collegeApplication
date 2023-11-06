<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script setup>
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
body{
  padding: 0 ;
  margin: 0 ;
  cursor: pointer;
}
</style>
