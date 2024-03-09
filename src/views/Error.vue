<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:48:59
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-09 22:23:14
 * @FilePath: \collegeApplication\src\views\Error.vue
 * @Description: 学生查询排名页面
-->
<template>
  <div class="show-container">
    <div class="title">
      <div class="text">
        <el-button plain @click="backoff">返回</el-button>
        ERROR
      </div>
    </div>
    <el-empty :image-size="400" description="发生错误" />
  </div>
</template>
<script setup>
function backoff() {
  window.history.go(-1);
}
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style  lang="scss" scoped>
</style>
  