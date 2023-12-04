<template>
  <div
    class="float-drag"
    id="moveDiv"
    @mousedown="down()"
    @touchstart="down()"
    @mousemove="move()"
    @touchmove="move()"
    @mouseup="end()"
    @touchend="end()"
  >
    <div class="float-button">
      <!-- 悬浮组件内容 -->
      <el-button size="large" type="primary" circle @click="handleExpandMenu">
        <el-icon :size="20">
          <Expand />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import store from "@/store";
const toucher = reactive({
  flags: false,
  position: { x: 0, y: 0 },
  nx: "",
  ny: "",
  dx: "",
  dy: "",
  xPum: "",
  yPum: "",
});
// 开始移动
const down = () => {
  toucher.flags = true;
  let touch;
  if (event.touches) {
    touch = event.touches[0];
  } else {
    touch = event;
  }
  toucher.position.x = touch.clientX;
  toucher.position.y = touch.clientY;
  toucher.dx = moveDiv.offsetLeft;
  toucher.dy = moveDiv.offsetTop;
};
// 移动
const move = () => {
  let touch;
  if (event.touches) {
    touch = event.touches[0];
  } else {
    touch = event;
  }
  toucher.nx = touch.clientX - toucher.position.x;
  toucher.ny = touch.clientY - toucher.position.y;
  toucher.xPum = toucher.dx + toucher.nx;
  toucher.yPum = toucher.dy + toucher.ny;
  //添加限制：只允许在屏幕内拖动
  const maxWidth = document.body.clientWidth - 60; //屏幕宽度减去悬浮框宽高
  const maxHeight = document.body.clientHeight - 60;
  if (toucher.xPum < 0) {
    //屏幕x限制
    toucher.xPum = 0;
  } else if (toucher.xPum > maxWidth) {
    toucher.xPum = maxWidth;
  }
  if (toucher.yPum < 0) {
    //屏幕y限制
    toucher.yPum = 0;
  } else if (toucher.yPum > maxHeight) {
    toucher.yPum = maxHeight;
  }
  moveDiv.style.left = toucher.xPum + "px";
  moveDiv.style.top = toucher.yPum + "px";
  //阻止页面的滑动默认事件
  document.addEventListener(
    "touchmove",
    function () {
      event.preventDefault(); //jq 阻止冒泡事件
    },
    false
  );
};
//鼠标释放时候的函数
const end = () => {
  toucher.flags = false;
};
// 切换菜单
const handleExpandMenu = () => {
  store.commit("setIsCollapse");
};
</script>

<style>
.float-drag {
  z-index: 999;
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
