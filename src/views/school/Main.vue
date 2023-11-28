<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <common-header/>
      </el-header>
      <el-main>
        <div class="main">
            <router-view />
        </div>
       
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import commonHeader from "@/components/common/common-header.vue";
</script>
<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
}
.el-header {
  position: relative;
  width: 100%;
  height: 60px;
  padding: 0px;
}
.el-main {
  position: absolute;
  top: 60px;
  width: 100%;
  bottom: 0;
  background-color: RGB(237,242,246);
  display: flex;
  justify-content: center;
}
.main{
    width: 90%;
}
</style>