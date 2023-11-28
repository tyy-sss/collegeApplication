<template>
  <div class="show-container">
    <div class="title">
      <div class="text">学校基础信息</div>
    </div>
    <el-divider />
    <div class="context">11</div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = ref(route.query.id);
</script>
<style src="@/assets/css/show-container.css" scoped/>
<style scoped>
.el-divider--horizontal {
  margin: 0;
}
</style>