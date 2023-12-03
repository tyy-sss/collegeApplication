<template>
  <div class="profession-shunt">
    <div class="top">
      <el-tabs class="demo-tabs">
        <el-tab-pane label="预测分流"><forecast-profession /></el-tab-pane>
        <el-tab-pane label="最终分流"><final-profession /></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup>
import finalProfession from "@/components/schoo-news/shunt/final-profession.vue";
import forecastProfession from "@/components/schoo-news/shunt/forecast-profession.vue";
</script>
<style scoped>
</style>
