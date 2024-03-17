<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <!-- 手机端收缩时 -->
      <common-float-aside v-if="phone && store.state.menu.isCollapse" />
      <!-- 电脑端 -->
      <el-aside v-else :width="asideWidth">
        <common-aside style="height: 100%" />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import CommonAside from "@/components/common/common-aside.vue";
import commonFloatAside from "@/components/common/common-float-aside.vue";
import { onBeforeMount, watch } from "vue";
import { giveMenu } from "@/assets/js/data/menu";
import { getRole } from "@/constants/token";
import store from "@/store";
// 判断打开时是手机端还是pc端
const phone = ref(null);
const isMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
};
let asideWidth = ref(null);
// 修改侧边栏的宽度
const setAsideWidth = (val) => {
  if (val) {
    asideWidth.value = "70px";
  } else {
    asideWidth.value = "140px";
  }
};
onBeforeMount(() => {
  store.commit("setMenu", giveMenu(getRole()));
  store.commit("addMenu");
  setAsideWidth(store.state.menu.isCollapse);
  // 判断是否是手机
  if (isMobile()) {
    phone.value = true;
  }
});
// 监听菜单收缩状态改变
watch(
  () => store.state.menu.isCollapse,
  (newVal, oldVal) => {
    console.log(newVal);
    setAsideWidth(newVal);
  }
);
</script>
<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
  background-color: RGBA(237, 242, 246);
}
.el-container {
  height: 100%;
}
.el-aside {
  top: 0px;
  left: 0px;
  height: 100%;
  overflow: hidden;
}
.el-main {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
