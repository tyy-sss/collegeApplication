<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-03 10:03:06
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-03 10:36:16
 * @FilePath: \collegeApplication\src\views\VolunteerBasis.vue
 * @Description: 志愿填报底页
-->
<template>
  <div class="show-container">
    <div class="title">
      <div class="text" @click="changeTest">志愿填报（{{ type }}）</div>
    </div>
    <hr />
    <router-view></router-view>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
let type = ref("正式填报");
const changeTest = () => {
  type.value = type.value === "正式填报" ? "预填报" : "正式填报";
};
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style scoped>
</style>
  