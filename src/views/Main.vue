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
  background-color: RGBA(237,242,246);
}
</style>