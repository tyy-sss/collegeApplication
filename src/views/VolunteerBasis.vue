<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-12-03 10:03:06
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-15 22:14:07
 * @FilePath: \collegeApplication\src\views\VolunteerBasis.vue
 * @Description: 志愿填报底页
-->
<template>
  <div class="show-container">
    <div class="title">
      <div class="text" @click="changeTest">志愿填报</div>
    </div>
    <hr />
    <router-view></router-view>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import studentFun from "@/api/student";
let data=reactive({
  type:"正式填报",
})
const changeTest = () => {
  data.type = data.type === "正式填报" ? "预填报" : "正式填报";
};

</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style scoped>
</style>
  