<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="asideWidth">
        <common-aside />
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
import { onBeforeMount, watch } from "vue";
import { giveMenu } from "@/assets/js/data/menu";
import { getRole } from "@/config/constants";
import store from "@/store";
onBeforeMount(() => {
  store.commit("setMenu", giveMenu(getRole));
  // console.log(giveMenu(getRole));
  store.commit("addMenu");
  setAsideWidth(store.state.menu.isCollapse);
});
var asideWidth = ref(null);
// 修改侧边栏的宽度
const setAsideWidth = (val) => {
  if (val) {
    asideWidth.value = "70px";
  } else {
    asideWidth.value = "140px";
  }
};
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
.el-aside {
  position: relative;
  top: 0px;
  left: 0px;
  /* width: 140px; */
  height: 100vh;
}
.el-main {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}
</style>