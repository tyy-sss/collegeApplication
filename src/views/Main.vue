<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="140px">
        <common-aside />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
  <script setup>
import CommonAside from "@/components/common/common-aside.vue";
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
  width: 140px;
  height: 100vh;
}
.el-main {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}
</style>